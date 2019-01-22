import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import request from 'swipes-core-js/utils/request';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from './ProjectAdd.swiss';

@connect(state => ({
  me: state.me,
}))
export default class ProjectAdd extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
    };

    this.handleAddProject = this.handleAddProject.bind(this);
    Navigation.events().bindComponent(this, 'ProjectAdd');
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'Cancel') {
      this.dismissModal();
    }
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleAddProject() {
    const { me } = this.props;
    const { projectName } = this.state;

    request('project.add', {
      name: projectName,
      owned_by: me.get('user_id'),
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
  }
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
    const { projectName } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding">
        <SW.Wrapper>
          <SW.HeaderText>Add project</SW.HeaderText>
          <SW.FormWrapper>
            <Input
              value={projectName}
              onChangeText={this.handleChangeText('projectName')}
              label={'Name'}
              autoFocus={true}
            />
            <Picker
              selectedValue={this.state.language}
              style={{ height: 100, width: '100%' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <View style={{ marginTop: 80 }}>
              <FormButton
                label={'Create project'}
                onPress={this.handleAddProject}
              />
            </View>
          </SW.FormWrapper>
        </SW.Wrapper>
      </KeyboardAvoidingView>
    );
  }
}
