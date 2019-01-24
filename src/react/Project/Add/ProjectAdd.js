import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { List, fromJS, Map } from 'immutable';
import merge from 'deepmerge';
import request from 'swipes-core-js/utils/request';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import Picker from 'src/react/Picker/Picker';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from './ProjectAdd.swiss';

@connect(state => ({
  myId: state.me.get('user_id'),
  organization: state.organization.toList(),
}))
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
      this.props.organization.map(o => {
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
    const { myId } = this.props;
    const { projectName, organizations } = this.state;

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
            <View style={{ marginTop: 30 }}>
              <FormLabel label={'Pick organization'} />
            </View>
            <View style={{ marginTop: 10 }}>
              <Picker
                values={organizations}
                defaultValue={myId}
                onChange={this.handlePickerChange}
              />
            </View>
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
