import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import SW from './FormLabel.swiss';

export default class FormLabel extends PureComponent {
  render() {
    const { label } = this.props;

    return (
      <SW.Wrapper>
        <SW.Label>{label.toUpperCase()}</SW.Label>
      </SW.Wrapper>
    );
  }
}
