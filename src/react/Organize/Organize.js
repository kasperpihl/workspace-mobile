import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './Organize.swiss';

const addButton = {
  id: 'Add',
  component: {
    name: 'IconTouchableWrapper',
    passProps: {
      icon: 'add',
      fill: 'blue',
      width: '17',
      height: '17',
      onPress: () => {
        Navigation.showModal(navigationComponents.ProjectAdd);
      },
    },
  },
};

export default class Organize extends PureComponent {
  componentWillMount() {
    Navigation.mergeOptions('Organize', {
      topBar: {
        rightButtons: [addButton],
      },
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Organize</SW.HeaderText>
      </SW.Wrapper>
    );
  }
}
