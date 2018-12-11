import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from 'src/react/Project/List/ProjectList.swiss';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.onAddProject = this.onAddProject.bind(this);
  }
  onAddProject() {
    Navigation.push('ProjectList', {
      component: navigationComponents.ProjectOverview,
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
