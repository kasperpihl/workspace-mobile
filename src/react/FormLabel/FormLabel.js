import React, { PureComponent } from 'react';
import SW from './FormLabel.swiss';

export default class FormLabel extends PureComponent {
  render() {
    const { label } = this.props;

    return (
      <SW.Wrapper>
        <SW.Label>{label}</SW.Label>
      </SW.Wrapper>
    );
  }
}
