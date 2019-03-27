import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Platform } from 'react-native';
import usePaginationRequest from 'core/react/_hooks/usePaginationRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import ChatCommentItem from 'src/react/Chat/Comment/Item/ChatCommentItem';
import SW from './ChatCommentList.swiss';

export default function ChatCommentsList({ discussion, myId }) {
  const { discussion_id, owned_by } = discussion;

  const [loadingNext, setLoadingNext] = useState(false);
  const req = usePaginationRequest(
    'comment.list',
    {
      discussion_id,
      attachments_only: false, // T_TODO implement only_attachments filter
    },
    {
      cursorKey: 'sent_at',
      idAttribute: 'comment_id',
      resultPath: 'comments',
    }
  );

  useUpdate('comment', comment => {
    if (comment.discussion_id === discussion_id) {
      if (comment.sent_at) {
        req.prependItem(comment);
      } else {
        req.mergeItem(comment);
      }
    }
  });

  if (req.error || req.loading) {
    return (
      <SW.Wrapper>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
    );
  }

  // T_TODO empty state
  // if (!req.items || !req.items.length) {
  //   return (
  //   );
  // }

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
  return (
    <SW.Wrapper>
      <FlatList
        inverted={true}
        data={req.items || []}
        onEndReached={async () => {
          if (req.hasMore) {
            setLoadingNext(true);
            await req.fetchNext();
            setLoadingNext(false);
          }
        }}
        onEndReachedThreshold={endReachedThreshold}
        keyExtractor={item => item.comment_id}
        renderItem={({ item }) => (
          <ChatCommentItem comment={item} teamId={owned_by} />
        )}
        ListFooterComponent={() => renderFooterLoader()}
      />
    </SW.Wrapper>
  );
}
