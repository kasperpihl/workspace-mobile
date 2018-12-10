import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import SW from 'src/react/Project/List/ProjectList.swiss';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onAddProject = this.onAddProject.bind(this);
  }
  onAddProject() {
    Navigation.push('ProjectList', {
      component: {
        id: 'ProjectOverview',
        name: 'ProjectOverview',
        options: {
          topBar: {
            backButton: {
              title: 'Organize',
            },
            rightButtons: [
              {
                id: 'Edit',
                text: 'Edit',
              },
              {
                id: 'Discuss',
                text: 'Discuss',
              },
            ],
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true,
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
