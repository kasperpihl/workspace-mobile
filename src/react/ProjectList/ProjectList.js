import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import SW from 'src/react/ProjectList/ProjectList.swiss';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onAddProject = this.onAddProject.bind(this);
  }
  onAddProject() {
    Navigation.push('ProjectList', {
      component: {
        id: 'Project',
        name: 'Project',
        options: {
          topBar: {
            title: {
              visible: true,
              animate: false,
              text: 'Untitled project',
            },
          },
        },
      },
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.ToolBarWrapper>
          <SW.AddProject onPress={this.onAddProject} />
        </SW.ToolBarWrapper>
        <SW.HeaderText>Organize</SW.HeaderText>
      </SW.Wrapper>
    );
  }
}
