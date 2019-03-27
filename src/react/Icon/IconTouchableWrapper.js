import React, { PureComponent } from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from 'src/react/Icon/IconTouchableWrapper.swiss';
import colors from 'src/utils/colors';
import { View } from 'react-native';

export default class IconTouchableWrapper extends PureComponent {
  render() {
    const { icon, fill, onPress, rotate, style, small, ...rest } = this.props;

    return (
      <SW.Wrapper
        onPress={onPress}
        disabled={onPress ? false : true}
        small={small}
      >
        <View
          style={{
            transform: [{ rotate: `${rotate || 0}deg` }],
            ...style,
          }}
        >
          <Icon name={icon} fill={colors[fill]} {...rest} />
        </View>
      </SW.Wrapper>
    );
  }
}
