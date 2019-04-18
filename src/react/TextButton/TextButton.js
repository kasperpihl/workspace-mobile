import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './TextButton.swiss';

export default class TextButton extends PureComponent {
  render() {
    const {
      forwardButton,
      backButton,
      buttonIcon,
      icon,
      textType,
      title = '',
      right = false,
      onPress,
      height,
    } = this.props;

    return (
      <SW.Wrapper right={right} height={height} onPress={onPress}>
        {(backButton || buttonIcon) && (
          <IconTouchableWrapper
            backButton={backButton}
            buttonIcon={buttonIcon}
            icon={icon}
            fill="dark"
          />
        )}
        <SW.Title textType={textType}>{title.toUpperCase()}</SW.Title>
        {forwardButton && (
          <IconTouchableWrapper size={12} icon="ArrowRight" fill="dark" />
        )}
      </SW.Wrapper>
    );
  }
}
