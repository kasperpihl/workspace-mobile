import React, { PureComponent } from 'react';
import userGetFullName from 'core/utils/user/userGetFullName';
import AssignItem from 'src/react/AssignItem/AssignItem';
import SW from './KeyboardAssignUserItem.swiss';

export default class KeyboardAssignUserItem extends PureComponent {
  renderRightButton = () => {
    const { assigned } = this.props;
    const icon = assigned ? 'X' : 'Plus';
    const iconColor = assigned ? 'sw2' : 'blue';

    return <IconTouchableWrapper icon={icon} fill={iconColor} />;
  };
  render() {
    const { item, assigned, onPress } = this.props;
    const user = item.user;
    const userId = user.get('user_id');
    const teamId = user.get('team_id');
    const fullName = userGetFullName(userId, teamId);

    return (
      <SW.Wrapper
        onPress={() => {
          onPress(user.get('user_id'), !assigned);
        }}
      >
        <AssignItem
          userId={userId}
          teamId={teamId}
          fullName={fullName}
          assigned={assigned}
        />
      </SW.Wrapper>
    );
  }
}
