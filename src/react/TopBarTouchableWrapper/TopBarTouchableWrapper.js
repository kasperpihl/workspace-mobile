import React, { PureComponent } from 'react';
import SW from './TopBarTouchableWrapper.swiss';

export default class TopBarTouchableWrapper extends PureComponent {
  render() {
    const { textType, title = '', right = false, onPress } = this.props;

    return (
      <SW.Wrapper right={right} onPress={onPress}>
        <SW.Title textType={textType}>{title.toUpperCase()}</SW.Title>
      </SW.Wrapper>
    );
  }
}
