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
                icon: 'back',
                fill: 'red',
                width: '12',
                height: '20.5',
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
