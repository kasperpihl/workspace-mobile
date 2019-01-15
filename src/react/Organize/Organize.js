import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './Organize.swiss';

export default class Organize extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this, 'Organize');
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId == 'Add') {
      Navigation.push('Organize', {
        component: navigationComponents.ProjectOverview,
      });
    }
  };
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Organize</SW.HeaderText>
      </SW.Wrapper>
    );
  }
}
