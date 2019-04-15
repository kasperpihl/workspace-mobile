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
      small,
      backButton,
      ...rest
    } = this.props;

    return (
      <SW.Wrapper
        onPress={onPress}
        disabled={onPress ? false : true}
        small={small}
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
