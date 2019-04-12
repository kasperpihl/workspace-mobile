import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import Promo from 'src/react/Promo/Promo';
import KeyboardAssignUserItem from 'src/react/Keyboard/Assign/UserItem/KeyboardAssignUserItem';
import Picker from 'src/react/Picker/Picker';
import userGetFullName from 'core/utils/user/userGetFullName';
import AssignItem from 'src/react/AssignItem/AssignItem';
import { List } from 'immutable';
import SW from './KeyboardAssign.swiss';

export default class KeyboardAssign extends PureComponent {
  constructor(props) {
    super(props);

    const assignees = props.lastSelectedTask.get('assignees');
    this.state = {
      selectedPeople: assignees.toJS() || [],
    };
  }
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
  handlePeopleChange = value => {
    const { lastSelectedTask, stateManager } = this.props;
    this.setState({
      selectedPeople: value,
    });
    stateManager.editHandler.updateAssignees(
      lastSelectedTask.get('task_id'),
      new List(value)
    );
  };
  preparePeopleValuesForPicker = () => {
    const { users } = this.props;
    const { selectedPeople } = this.state;

    if (!users) return [];

    const items = [];

    users
      .filter(user => user.get('status') !== 'disabled')
      .forEach((user, key) => {
        const userId = user.get('user_id');
        const teamId = user.get('team_id');
        const fullName = userGetFullName(userId, teamId);

        items.push(
          <AssignItem
            size={30}
            key={key}
            userId={userId}
            teamId={teamId}
            fullName={fullName}
            assigned={selectedPeople.includes(userId)}
          />
        );
      });

    return items;
  };
  render() {
    const { users, lastSelectedTask } = this.props;
    const { selectedPeople } = this.state;

    if (!users) {
      return <Promo />;
    }

    const taskId = lastSelectedTask.get('task_id');

    return (
      <ScrollView alwaysBounceVertical={false}>
        <SW.Wrapper>
          <Picker
            key={taskId}
            multiselect={true}
            values={this.preparePeopleValuesForPicker()}
            onChange={this.handlePeopleChange}
            defaultValue={selectedPeople}
          />
        </SW.Wrapper>
      </ScrollView>
    );
  }
}
