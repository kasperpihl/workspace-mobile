import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import SW from './KeyboardAssign.swiss';

export default class KeyboardAssign extends PureComponent {
  render() {
    return (
      <SW.Wrapper>
        <Text>Assigning Keyboard</Text>
      </SW.Wrapper>
    );
  }
}
