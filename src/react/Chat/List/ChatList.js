import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import usePaginationRequest from 'core/react/_hooks/usePaginationRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import ChatListItem from 'src/react/Chat/List/Item/ChatListItem';
import Tabs from 'src/react/Tabs/Tabs';
import navigationComponents from 'src/utils/navigationComponentsSettings';
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
        Navigation.showModal(navigationComponents.ChatAdd);
      },
    },
  },
};

function ChatList({ myId, type }) {
  const req = usePaginationRequest(
    'discussion.list',
    {
      type,
    },
    {
      idAttribute: 'discussion_id',
      cursorKey: 'last_comment_at',
      resultPath: 'discussions',
    }
  );

  useUpdate('discussion', update => {
    if (!update.last_comment) {
      return req.mergeItem(update);
    }
    if (
      (type === 'following' && update.followers[myId]) ||
      (type === 'all other' && !update.followers[myId])
    ) {
      req.fetchNew();
    }
  });

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
    <SW.ListWrapper>
      {renderLoader()}
      {renderList()}
    </SW.ListWrapper>
  );
}

function ChatListWrapper({ myId, unreadCounter, componentId }) {
  const [type, setType] = useState('following');

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

  return (
    <SW.Wrapper>
      <SW.HeaderText>Discussions</SW.HeaderText>
      <Tabs
        tabs={['following', 'all other']}
        selected={type}
        onPress={tab => {
          setType(tab);
        }}
      />
      <ChatList myId={myId} key={type} type={type} />
    </SW.Wrapper>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
  unreadCounter: state.connection.get('unread').size,
}))(ChatListWrapper);
