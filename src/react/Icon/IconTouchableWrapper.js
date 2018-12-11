import React, { PureComponent } from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from 'src/react/Icon/IconTouchableWrapper.swiss';
import colors from 'src/utils/colors';
import { View } from 'react-native';

export default class IconTouchableWrapper extends PureComponent {
  render() {
    const { icon, fill, onPress, rotate, ...rest } = this.props;

    return (
      <View style={{ transform: [{ rotate: `${rotate || 0}deg` }] }}>
        <SW.Wrapper onPress={onPress}>
          <Icon name={icon} fill={colors[fill]} {...rest} />
        </SW.Wrapper>
      </View>
    );
  }
}
