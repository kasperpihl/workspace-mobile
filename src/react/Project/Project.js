import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import SW from 'src/react/Project/Project.swiss';

export default class Project extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <SW.ToolBarWrapper>
            <SW.AddProject />
          </SW.ToolBarWrapper>
          <SW.HeaderText>New Project</SW.HeaderText>
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
