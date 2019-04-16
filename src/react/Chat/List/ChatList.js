import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Platform } from 'react-native';
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
      icon: 'New',
      fill: 'dark',
      onPress: () => {
        Navigation.showModal(navigationComponents.ChatAdd);
      },
    },
  },
};

function ChatList({ myId, type }) {
  const [loadingNext, setLoadingNext] = useState(false);
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
      (type === 'following' && update.members[myId]) ||
      (type === 'all other' && !update.members[myId])
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

  const renderFooterLoader = () => {
    if (loadingNext) {
      return (
        <SW.LoaderContainerFooter>
          <ActivityIndicator size="small" color="#007AFF" />
        </SW.LoaderContainerFooter>
      );
    }

    return null;
  };

  const endReachedThreshold = Platform.OS === 'ios' ? 0 : 1;
  const renderList = () => {
    if (!req.error || !req.loading) {
      return (
        <FlatList
          data={req.items ? req.items : []}
          onEndReached={async () => {
            if (req.hasMore) {
              setLoadingNext(true);
              await req.fetchNext();
              setLoadingNext(false);
            }
          }}
          onEndReachedThreshold={endReachedThreshold}
          keyExtractor={item => item.discussion_id}
          renderItem={({ item }) => <ChatListItem item={item} myId={myId} />}
          ListFooterComponent={() => renderFooterLoader()}
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
      <SW.HeaderText>Chat</SW.HeaderText>
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
