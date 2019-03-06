import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { List, fromJS, Map } from 'immutable';
import merge from 'deepmerge';
import request from 'core/utils/request';
import userGetFullName from 'core/utils/user/userGetFullName';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormLabel from 'src/react/FormLabel/FormLabel';
import Picker from 'src/react/Picker/Picker';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import AssignItem from 'src/react/AssignItem/AssignItem';
import SW from './ChatAdd.swiss';

@connect(state => ({
  organizations: state.organizations,
}))
@withKeyboard
export default class ChatAdd extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this, 'ChatAdd');

    const organization_id = this.props.organizations
      .toList()
      .getIn([0, 'organization_id']);

    this.state = {
      organization_id,
      chatTitle: '',
      organizations: this.props.organizations.toList().map(o => {
        return Map({ label: o.get('name'), value: o.get('organization_id') });
      }),
      orgUsers: this.props.organizations.getIn([organization_id, 'users']),
      privacyOptions: new List(
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
      selectedPeople: [],
      privacy: 'public',
    };
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'Cancel') {
      this.dismissModal();
    }
    if (buttonId === 'Create') {
      this.handleAddChat();
    }
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleOrganizationChange = value => {
    const { organizations } = this.props;

    this.setState({
      organization_id: value,
      orgUsers: organizations.getIn([value, 'users']),
      selectedPeople: [],
    });
  };
  handlePrivacyChange = value => {
    this.setState({
      privacy: value,
    });
  };
  handlePeopleChange = value => {
    this.setState({
      selectedPeople: value,
    });
  };
  handleAddChat = () => {
    const { chatTitle, organization_id, selectedPeople, privacy } = this.state;

    request('discussion.add', {
      privacy,
      topic: chatTitle,
      owned_by: organization_id,
      followers: selectedPeople,
    }).then(res => {
      if (res.ok === false) {
        return alertErrorHandler(res);
      }

      this.dismissModal();

      // const chatId = res.update.rows[0].data.project_id;
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
  preparePeopleValuesForPicker = () => {
    const { orgUsers, selectedPeople } = this.state;

    if (!orgUsers) return [];

    const items = [];

    orgUsers.forEach((user, key) => {
      const userId = user.get('user_id');
      const organizationId = user.get('organization_id');
      const fullName = userGetFullName(userId, organizationId);

      items.push(
        <AssignItem
          key={key}
          userId={userId}
          organizationId={organizationId}
          fullName={fullName}
          assigned={selectedPeople.includes(userId)}
        />
      );
    });

    return items;
  };
  render() {
    const { keyboardIsShown } = this.props;
    const {
      chatTitle,
      organizations,
      organization_id,
      privacy,
      privacyOptions,
      privacyOptionsEnabled,
    } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    if (!organizations.size) return null;

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView behavior={behavior}>
          <SW.Wrapper>
            {!keyboardIsShown && (
              <SW.HeaderTextWrapper>
                <SW.HeaderText>New Discussion</SW.HeaderText>
              </SW.HeaderTextWrapper>
            )}
            <SW.FormWrapper>
              <Form>
                <View>
                  <FormLabel label={'Name'} />
                  <FormTextInput
                    last
                    value={chatTitle}
                    onChangeText={this.handleChangeText('chatTitle')}
                    onSubmitEditing={this.handleAddProject}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Pick organization'} />
                  <Picker
                    values={organizations}
                    defaultValue={organization_id}
                    onChange={this.handleOrganizationChange}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Choose privacy'} />
                  <Picker
                    values={privacyOptions}
                    defaultValue={privacy}
                    onChange={this.handlePrivacyChange}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Choose people'} />
                  <Picker
                    key={organization_id}
                    multiselect={true}
                    values={this.preparePeopleValuesForPicker()}
                    onChange={this.handlePeopleChange}
                  />
                </View>
              </Form>
            </SW.FormWrapper>
          </SW.Wrapper>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
