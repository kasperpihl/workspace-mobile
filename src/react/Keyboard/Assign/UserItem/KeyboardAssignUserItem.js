import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import userGetFullName from 'swipes-core-js/utils/user/userGetFullName';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './KeyboardAssignUserItem.swiss';

export default class KeyboardAssignUserItem extends PureComponent {
  renderRightButton = () => {
    const { assigned } = this.props;
    const icon = assigned ? 'x' : 'plus';
    const iconColor = assigned ? 'sw2' : 'blue';

    return (
      <IconTouchableWrapper
        icon={icon}
        fill={iconColor}
        width="14"
        height="14"
      />
    );
  };
  render() {
    const { item, assigned, onPress } = this.props;
    const user = item.user;
    const fullName = userGetFullName(
      user.get('user_id'),
      user.get('organization_id')
    );

    return (
      <SW.Wrapper
        onPress={() => {
          onPress(user.get('user_id'), !assigned);
        }}
      >
        <SW.Circle />
        <Text>{fullName}</Text>
        <SW.RightButton>{this.renderRightButton()}</SW.RightButton>
      </SW.Wrapper>
    );
  }
}
