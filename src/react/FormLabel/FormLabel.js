import React, { PureComponent } from 'react';
import SW from './FormLabel.swiss';

export default class FormLabel extends PureComponent {
  render() {
    const { label, onPress } = this.props;

    return (
      <SW.Wrapper onPress={onPress}>
        <SW.Label>{label}</SW.Label>
      </SW.Wrapper>
    );
  }
}
