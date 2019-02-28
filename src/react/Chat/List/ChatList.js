import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import usePaginationRequest from 'core/react/_hooks/usePaginationRequest';
import ChatListItem from 'src/react/Chat/List/Item/ChatListItem';
import SW from './ChatList.swiss';

const addButton = {
  id: 'Add',
  component: {
    name: 'IconTouchableWrapper',
    passProps: {
      icon: 'add',
      fill: 'blue',
      width: '17',
      height: '17',
      onPress: () => {
        console.log('chushki');
      },
    },
  },
};

export default connect(state => ({
  myId: state.me.get('user_id'),
  unreadCounter: state.connection.get('unread').size,
}))(ChatList);

function ChatList({ myId, type, unreadCounter, componentId }) {
  useEffect(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        rightButtons: [addButton],
      },
      bottomTab: {
        badge: unreadCounter ? `${unreadCounter}` : null,
        badgeColor: 'red',
      },
    });
  }, []);

  const req = usePaginationRequest(
    'discussion.list',
    {
      type: 'following', // T_TODO until I put tabs
    },
    {
      idAttribute: 'discussion_id',
      cursorKey: 'last_comment_at',
      resultPath: 'discussions',
    }
  );

  // T_TODO remove that at some point
  console.log(req);

  const renderLoader = () => {
    if (req.error || req.loading) {
      return (
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      );
    }
  };

  const renderList = () => {
    if (!req.error || !req.loading) {
      return (
        <FlatList
          data={req.items ? req.items : []}
          onEndReached={() => req.fetchNext()}
          onEndReachedThreshold={0}
          keyExtractor={item => item.discussion_id}
          renderItem={({ item }) => <ChatListItem item={item} myId={myId} />}
          // ListFooterComponent={() => this.renderListFooter(p.loading)}
        />
      );
    }
  };

  return (
    <SW.Wrapper>
      <SW.HeaderText>Chat</SW.HeaderText>
      {renderLoader()}
      {renderList()}
    </SW.Wrapper>
  );
}
