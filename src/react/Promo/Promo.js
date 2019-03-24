import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import SW from './Promo.swiss';

export default class Promo extends PureComponent {
  render() {
    return (
      <SW.Wrapper>
        <Text>
          In order to assign people you should create team and invite your
          colleagues
        </Text>
      </SW.Wrapper>
    );
  }
}
