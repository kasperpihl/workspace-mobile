import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './Organize.swiss';

export default class Organize extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    Navigation.mergeOptions('Organize', {
      topBar: {
        rightButtons: [
          {
            id: 'Add',
            component: {
              name: 'IconTouchableWrapper',
              passProps: {
                icon: 'add',
                fill: 'blue',
                width: '17',
                height: '17',
                onPress: () => {
                  Navigation.push('Organize', {
                    component: navigationComponents.ProjectOverview,
                  });
                },
              },
            },
          },
        ],
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
