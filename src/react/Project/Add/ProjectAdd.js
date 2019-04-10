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
import AssignItem from 'src/react/AssignItem/AssignItem';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import SW from './ProjectAdd.swiss';

@connect(state => ({
  myId: state.me.get('user_id'),
  teams: state.teams,
}))
@withKeyboard
export default class ProjectAdd extends PureComponent {
  constructor(props) {
    super(props);

    const team_id = this.props.teams.toList().getIn([0, 'team_id']);

    this.state = {
      projectName: '',
      team_id,
      teams: this.props.teams
        .toList()
        .map(team => {
          return Map({ label: team.get('name'), value: team.get('team_id') });
        })
        .concat(fromJS([{ label: 'Personal', value: this.props.myId }])),
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
      privacy: 'public',
      selectedPeople: [],
    };

    this.createButton = {
      id: 'Create',
      component: {
        name: 'TopBarTouchableWrapper',
        passProps: {
          title: 'Create',
          textType: 'captionGreen',
          onPress: () => {
            this.handleAddProject();
          },
        },
      },
    };

    this.cancelButton = {
      id: 'Cancel',
      component: {
        name: 'TopBarTouchableWrapper',
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
    Navigation.mergeOptions('ProjectAdd', {
      topBar: {
        leftButtons: [this.cancelButton],
        rightButtons: [this.createButton],
      },
    });
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleAddProject = () => {
    const { projectName, team_id, privacy, selectedPeople } = this.state;

    request('project.add', {
      privacy,
      title: projectName,
      owned_by: team_id,
      members: selectedPeople,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      }

      const projectId = res.update.rows[0].data.project_id;

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
  handleTeamChange = value => {
    const { teams } = this.props;

    this.setState({
      team_id: value,
      teamUsers: teams.getIn([value, 'users']),
      privacy: 'public',
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
  dismissModal() {
    Navigation.dismissModal('ProjectAdd', {
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
    const { myId, keyboardIsShown } = this.props;
    const { projectName, teams, privacyOptions, privacy, team_id } = this.state;
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
                <SW.HeaderText>New Project</SW.HeaderText>
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
                  <FormLabel label={'Pick team'} />
                  <Picker
                    values={teams}
                    defaultValue={team_id}
                    onChange={this.handleTeamChange}
                  />
                </View>
                {team_id !== myId && (
                  <View style={{ marginTop: 40 }}>
                    <FormLabel label={'Choose privacy'} />
                    <Picker
                      values={privacyOptions}
                      defaultValue={privacy}
                      onChange={this.handlePrivacyChange}
                    />
                  </View>
                )}
                {team_id !== myId && privacy !== 'public' && (
                  <View style={{ marginTop: 40 }}>
                    <FormLabel label={'Choose people'} />
                    <Picker
                      key={team_id}
                      multiselect={true}
                      values={this.preparePeopleValuesForPicker()}
                      onChange={this.handlePeopleChange}
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
