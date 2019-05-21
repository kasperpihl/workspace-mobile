import React, { PureComponent } from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from 'src/react/Icon/IconTouchableWrapper.swiss';
import { View } from 'react-native';

export default class IconTouchableWrapper extends PureComponent {
  render() {
    const {
      icon,
      onPress,
      rotate,
      style,
      topbar,
      backButton,
      size,
      ...rest
    } = this.props;

    return (
      <SW.Wrapper
        size={size}
        onPress={onPress}
        disabled={onPress ? false : true}
        topbar={topbar}
        backButton={backButton}
      >
        <View
          style={{
            transform: [{ rotate: `${rotate || 0}deg` }],
            ...style,
          }}
        >
          <Icon name={icon} {...rest} />
        </View>
      </SW.Wrapper>
    );
  }
}
