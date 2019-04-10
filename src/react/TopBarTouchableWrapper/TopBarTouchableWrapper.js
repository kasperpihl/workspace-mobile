import React, { PureComponent } from 'react';
import SW from './TopBarTouchableWrapper.swiss';

export default class TopBarTouchableWrapper extends PureComponent {
  render() {
    const { textType, title = '', onPress } = this.props;

    return (
      <SW.Wrapper onPress={onPress}>
        <SW.Title textType={textType}>{title.toUpperCase()}</SW.Title>
      </SW.Wrapper>
    );
  }
}
