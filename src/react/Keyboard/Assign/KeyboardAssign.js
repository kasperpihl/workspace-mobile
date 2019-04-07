import React, { PureComponent } from 'react';
import { VirtualizedList } from 'react-native';
import Promo from 'src/react/Promo/Promo';
import KeyboardAssignUserItem from 'src/react/Keyboard/Assign/UserItem/KeyboardAssignUserItem';
import SW from './KeyboardAssign.swiss';

export default class KeyboardAssign extends PureComponent {
  getItemCount = data => data.size;
  getItem = (data, index) => ({
    key: data.getIn([index, 'user_id']),
    user: data.get(index),
  });
  renderItem = ({ item }) => {
    const { lastSelectedTask } = this.props;
    const assignees = lastSelectedTask.get('assignees');
    const user = item.user;
    const assigned = assignees.includes(user.get('user_id'));

    return (
      <KeyboardAssignUserItem
        item={item}
        assigned={assigned}
        onPress={this.onItemPressed}
      />
    );
  };
  onItemPressed = (user_id, assigned) => {
    const { stateManager, lastSelectedTask } = this.props;
    const assignees = lastSelectedTask.get('assignees');
    let finalAssignees;

    if (assigned) {
      finalAssignees = assignees.push(user_id);
    } else {
      finalAssignees = assignees.filter(x => x !== user_id);
    }

    stateManager.editHandler.updateAssignees(
      lastSelectedTask.get('task_id'),
      finalAssignees
    );
  };
  render() {
    const { users } = this.props;

    if (!users) {
      return <Promo />;
    }

    const filteredUsers = users
      .toList()
      .filter(user => user.get('status') !== 'disabled');

    return (
      <SW.Wrapper>
        <VirtualizedList
          alwaysBounceVertical={false}
          getItem={this.getItem}
          getItemCount={this.getItemCount}
          data={filteredUsers}
          renderItem={this.renderItem}
        />
      </SW.Wrapper>
    );
  }
}
