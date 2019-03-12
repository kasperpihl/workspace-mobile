import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import usePaginationRequest from 'core/react/_hooks/usePaginationRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import ChatCommentItem from 'src/react/Chat/Comment/Item/ChatCommentItem';
import SW from './ChatCommentList.swiss';

export default function ChatCommentsList({ discussion, myId }) {
  const { discussion_id, owned_by } = discussion;

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

  return (
    <SW.Wrapper>
      <FlatList
        inverted={true}
        data={req.items || []}
        onEndReached={() => req.fetchNext()}
        onEndReachedThreshold={0}
        keyExtractor={item => item.comment_id}
        renderItem={({ item }) => (
          <ChatCommentItem comment={item} organizationId={owned_by} />
        )}
        // ListFooterComponent={() => this.renderListFooter(p.loading)}
      />
    </SW.Wrapper>
  );
}
