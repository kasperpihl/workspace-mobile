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
  renderItem = ({ item }) => <KeyboardAssignUserItem item={item} />;
  render() {
    const { users } = this.props;

    if (!users) {
      return <Promo />;
    }

    return (
      <SW.Wrapper>
        <VirtualizedList
          alwaysBounceVertical={false}
          getItem={this.getItem}
          getItemCount={this.getItemCount}
          data={users.toList()}
          renderItem={this.renderItem}
        />
      </SW.Wrapper>
    );
  }
}
