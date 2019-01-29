import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import userGetFullName from 'swipes-core-js/utils/user/userGetFullName';
import SW from './KeyboardAssignUserItem.swiss';

export default class KeyboardAssignUserItem extends PureComponent {
  render() {
    const { item } = this.props;
    const user = item.user;
    const fullName = userGetFullName(
      user.get('user_id'),
      user.get('organization_id')
    );

    return (
      <SW.Wrapper>
        <SW.Circle />
        <Text>{fullName}</Text>
      </SW.Wrapper>
    );
  }
}
