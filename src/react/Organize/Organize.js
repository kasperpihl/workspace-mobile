import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './Organize.swiss';

export default class Organize extends PureComponent {
  handleAddProject = () => {
    Navigation.push('Organize', {
      component: navigationComponents.ProjectOverview,
    });
  };
  render() {
    return (
      <SW.Wrapper>
        <SW.ToolBarWrapper>
          <SW.AddProject onPress={this.handleAddProject} />
        </SW.ToolBarWrapper>
        <SW.HeaderText>Organize</SW.HeaderText>
      </SW.Wrapper>
    );
  }
}
