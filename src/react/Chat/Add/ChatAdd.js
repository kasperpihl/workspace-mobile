import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { List, fromJS, Map } from 'immutable';
import request from 'core/utils/request';
import userGetFullName from 'core/utils/user/userGetFullName';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormLabel from 'src/react/FormLabel/FormLabel';
import Picker from 'src/react/Picker/Picker';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import AssignItem from 'src/react/AssignItem/AssignItem';
import SW from './ChatAdd.swiss';

@connect(state => ({
  teams: state.teams,
}))
@withKeyboard
export default class ChatAdd extends PureComponent {
  constructor(props) {
    super(props);

    const team_id = this.props.teams.toList().getIn([0, 'team_id']);

    this.state = {
      team_id,
      chatTitle: '',
      teams: this.props.teams.toList().map(o => {
        return Map({ label: o.get('name'), value: o.get('team_id') });
      }),
      teamUsers: this.props.teams.getIn([team_id, 'users']),
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

    this.createButton = {
      id: 'Create',
      component: {
        name: 'TextButton',
        passProps: {
          title: 'Create',
          textType: 'captionGreen',
          right: true,
          onPress: () => {
            this.handleAddChat();
          },
        },
      },
    };

    this.cancelButton = {
      id: 'Cancel',
      component: {
        name: 'TextButton',
        alignment: 'fill',
        passProps: {
          title: 'Cancel',
          textType: 'captionDark',
          onPress: () => {
            this.dismissModal();
          },
        },
      },
    };
  }
  componentDidMount = () => {
    Navigation.mergeOptions('ChatAdd', {
      topBar: {
        title: this.cancelButton,
        rightButtons: [this.createButton],
      },
    });
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleTeamChange = value => {
    const { teams } = this.props;

    this.setState({
      team_id: value,
      teamUsers: teams.getIn([value, 'users']),
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
    const { chatTitle, team_id, selectedPeople, privacy } = this.state;

    request('discussion.add', {
      privacy,
      title: chatTitle,
      owned_by: team_id,
      members: selectedPeople,
    }).then(res => {
      if (res.ok === false) {
        return alertErrorHandler(res);
      }

      window.analytics.sendEvent('Chat created', team_id, {
        Privacy: privacy,
        'Tagged people': selectedPeople.length,
      });
      this.dismissModal();
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
    const { teamUsers, selectedPeople } = this.state;

    if (!teamUsers) return [];

    const items = [];

    teamUsers
      .filter(user => user.get('status') !== 'disabled')
      .forEach((user, key) => {
        const userId = user.get('user_id');
        const teamId = user.get('team_id');
        const fullName = userGetFullName(userId, teamId);

        items.push(
          <AssignItem
            key={key}
            userId={userId}
            teamId={teamId}
            fullName={fullName}
            assigned={selectedPeople.includes(userId)}
          />
        );
      });

    return items;
  };
  render() {
    const { keyboardIsShown } = this.props;
    const { chatTitle, teams, team_id, privacy, privacyOptions } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    if (!teams.size) return null;

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
                  <FormLabel label={'Title'} />
                  <FormTextInput
                    last
                    value={chatTitle}
                    onChangeText={this.handleChangeText('chatTitle')}
                    onSubmitEditing={this.handleAddProject}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Team'} />
                  <Picker
                    values={teams}
                    defaultValue={team_id}
                    onChange={this.handleTeamChange}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Privacy'} />
                  <Picker
                    values={privacyOptions}
                    defaultValue={privacy}
                    onChange={this.handlePrivacyChange}
                  />
                </View>
                <View style={{ marginTop: 40 }}>
                  <FormLabel label={'Members'} />
                  <Picker
                    key={team_id}
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
