import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import userGetFullName from 'swipes-core-js/utils/user/userGetFullName';
import SW from './KeyboardAssignUserItem.swiss';

export default class KeyboardAssignUserItem extends PureComponent {
  renderRightButton = () => {
    const { assigned } = this.props;
    const label = assigned ? 'Remove' : 'Add';

    return <Text>{label}</Text>;
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
