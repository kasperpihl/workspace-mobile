import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import SW from 'src/react/Project/Keyboards/Assign/KeyboardAssign.swiss';

export default class KeyboardAssign extends PureComponent {
  render() {
    return (
      <SW.Wrapper>
        <Text>Assigning Keyboard</Text>
      </SW.Wrapper>
    );
  }
}
