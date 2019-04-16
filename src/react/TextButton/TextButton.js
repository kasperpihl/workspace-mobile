import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './TextButton.swiss';

export default class TextButton extends PureComponent {
  render() {
    const {
      backArrow,
      textType,
      title = '',
      right = false,
      onPress,
    } = this.props;

    return (
      <SW.Wrapper right={right} onPress={onPress}>
        {backArrow && (
          <IconTouchableWrapper
            backButton={true}
            icon="ArrowLeft"
            fill="dark"
          />
        )}
        <SW.Title textType={textType}>{title.toUpperCase()}</SW.Title>
      </SW.Wrapper>
    );
  }
}