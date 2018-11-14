import React, { PureComponent } from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from 'src/react/Icon/IconTouchableWrapper.swiss';
import colors from 'src/utils/colors';

export default class IconTouchableWrapper extends PureComponent {
  render() {
    const { name, fill, onPress, ...rest } = this.props;

    return (
      <SW.Wrapper onPress={onPress}>
        <Icon name={name} fill={colors[fill]} {...rest} />
      </SW.Wrapper>
    );
  }
}
