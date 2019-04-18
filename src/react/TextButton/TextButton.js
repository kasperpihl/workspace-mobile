import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './TextButton.swiss';

export default class TextButton extends PureComponent {
  render() {
    const {
      backButton,
      buttonIcon,
      icon,
      textType,
      title = '',
      right = false,
      onPress,
    } = this.props;

    return (
      <SW.Wrapper right={right} onPress={onPress}>
        {(backButton || buttonIcon) && (
          <IconTouchableWrapper
            backButton={backButton}
            buttonIcon={buttonIcon}
            icon={icon}
            fill="dark"
          />
        )}
        <SW.Title textType={textType}>{title.toUpperCase()}</SW.Title>
      </SW.Wrapper>
    );
  }
}
