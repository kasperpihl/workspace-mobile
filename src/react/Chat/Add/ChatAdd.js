import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { List, fromJS, Map } from 'immutable';
import merge from 'deepmerge';
import request from 'core/utils/request';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormLabel from 'src/react/FormLabel/FormLabel';
import Picker from 'src/react/Picker/Picker';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import SW from './ChatAdd.swiss';

@connect(state => ({
  myId: state.me.get('user_id'),
  organizations: state.organizations,
}))
@withKeyboard
export default class ChatAdd extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this, 'ProjectAdd');
  }
  state = {
    projectName: '',
    organization_id: this.props.myId,
    organizations: new List(
      fromJS([
        {
          label: 'Personal',
          value: this.props.myId,
        },
      ])
    ).concat(
      this.props.organizations.toList().map(o => {
        return Map({ label: o.get('name'), value: o.get('organization_id') });
      })
    ),
    pricacyOptionsEnabled: false,
    pricacyOptions: new List(
      fromJS([
        {
          label: 'Public',
          value: 'public',
        },
        {
          label: 'Private',
          value: 'private',
        },
      ])
    ),
  };
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'Cancel') {
      this.dismissModal();
    }
    if (buttonId === 'Create') {
      // this.handleAddProject();
    }
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleOrganizationChange = value => {
    const { myId, organizations } = this.props;

    this.setState({
      organization_id: value,
      pricacyOptionsEnabled: myId === value ? false : true,
      orgUsers: myId === value ? null : organizations.getIn([value, 'users']),
    });
  };
  handleAddChat = () => {
    const { chatTitle, organization_id } = this.state;

    request('discussion.add', {
      title: chatTitle,
      owned_by: organization_id,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      }

      // const projectId = res.update.rows[0].data.project_id;

      this.dismissModal();
      // Navigation.push('ProjectList', {
      //   component: merge(navigationComponents.ProjectOverview, {
      //     passProps: {
      //       projectId,
      //     },
      //     options: {
      //       animations: {
      //         push: {
      //           enabled: false,
      //         },
      //       },
      //     },
      //   }),
      // });
    });
  };
  dismissModal() {
    Navigation.dismissModal('ChatAdd', {
      animations: {
        dismissModal: {
          enabled: false,
        },
      },
    });
  }
  render() {
    const { myId, keyboardIsShown } = this.props;
    const {
      projectName,
      organizations,
      pricacyOptions,
      pricacyOptionsEnabled,
    } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView behavior={behavior}>
          <SW.Wrapper>
            {!keyboardIsShown && (
              <SW.HeaderTextWrapper>
                <SW.HeaderText>New Chat</SW.HeaderText>
              </SW.HeaderTextWrapper>
            )}
            <SW.FormWrapper>
              <Form>
                <View>
                  <FormLabel label={'Name'} />
                  <FormTextInput
                    last
                    value={projectName}
                    onChangeText={this.handleChangeText('projectName')}
                    onSubmitEditing={this.handleAddProject}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Pick organization'} />
                  <Picker
                    values={organizations}
                    defaultValue={myId}
                    onChange={this.handleOrganizationChange}
                  />
                </View>
                {pricacyOptionsEnabled && (
                  <View style={{ marginTop: 40 }}>
                    <FormLabel label={'Choose privacy'} />
                    <Picker
                      values={pricacyOptions}
                      defaultValue={'public'}
                      // onChange={this.handlePickerChange}
                    />
                  </View>
                )}
                {pricacyOptionsEnabled && (
                  <View style={{ marginTop: 40 }}>
                    <FormLabel label={'Choose people'} />
                    <Picker
                      values={pricacyOptions}
                      defaultValue={'public'}
                      // onChange={this.handlePickerChange}
                    />
                  </View>
                )}
              </Form>
            </SW.FormWrapper>
          </SW.Wrapper>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
