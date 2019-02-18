import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { List, fromJS, Map } from 'immutable';
import merge from 'deepmerge';
import request from 'swipes-core-js/utils/request';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import Picker from 'src/react/Picker/Picker';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import SW from './ProjectAdd.swiss';

@connect(state => ({
  myId: state.me.get('user_id'),
  organizations: state.organizations.toList(),
}))
@withKeyboard
export default class ProjectAdd extends PureComponent {
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
      this.props.organizations.map(o => {
        return Map({ label: o.get('name'), value: o.get('organization_id') });
      })
    ),
  };
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'Cancel') {
      this.dismissModal();
    }
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handlePickerChange = value => {
    this.setState({
      organization_id: value,
    });
  };
  handleAddProject = () => {
    const { projectName, organization_id } = this.state;

    request('project.add', {
      name: projectName,
      owned_by: organization_id,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      }

      const projectId = res.updates[0].data.project_id;

      this.dismissModal();
      Navigation.push('ProjectList', {
        component: merge(navigationComponents.ProjectOverview, {
          passProps: {
            projectId,
          },
          options: {
            animations: {
              push: {
                enabled: false,
              },
            },
          },
        }),
      });
    });
  };
  dismissModal() {
    Navigation.dismissModal('ProjectAdd', {
      animations: {
        dismissModal: {
          enabled: false,
        },
      },
    });
  }
  render() {
    const { myId, keyboardIsShown } = this.props;
    const { projectName, organizations } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView behavior={behavior}>
          <SW.Wrapper>
            {!keyboardIsShown && (
              <SW.HeaderTextWrapper>
                <SW.HeaderText>Add Project</SW.HeaderText>
              </SW.HeaderTextWrapper>
            )}
            <SW.FormWrapper>
              <Form
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  flex: 1,
                }}
              >
                <View>
                  <FormLabel label={'Name'} />
                  <FormTextInput
                    last
                    value={projectName}
                    onChangeText={this.handleChangeText('projectName')}
                    autoFocus={true}
                    onSubmitEditing={this.handleAddProject}
                  />
                </View>
                <View>
                  <FormLabel label={'Pick organization'} />
                  <Picker
                    values={organizations}
                    defaultValue={myId}
                    onChange={this.handlePickerChange}
                  />
                </View>
                <View>
                  <FormButton
                    label={'Create project'}
                    onPress={this.handleAddProject}
                  />
                </View>
              </Form>
            </SW.FormWrapper>
            <SW.FooterWrapper />
          </SW.Wrapper>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
