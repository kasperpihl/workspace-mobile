import React from 'react';
import { connect } from 'react-redux';
import request from 'core/utils/request';
import useRequest from 'core/react/_hooks/useRequest';
import ChatCommentsList from 'src/react/Chat/Comment/List/ChatCommentList';
import SW from './ChatOverview.swiss';

function ChatOverview({ discussion, myId }) {
  const { discussion_id, topic } = discussion;
  // `mark as read` logic
  const req = useRequest(
    'discussion.get',
    {
      discussion_id,
    },
    result => {
      const { discussion } = result;
      const ts = discussion.followers[myId];
      if (ts === 'n' || ts < discussion.last_comment_at) {
        request('discussion.markAsRead', {
          read_at: discussion.last_comment_at,
          discussion_id: discussion.discussion_id,
        });
      }
    }
  );

  return (
    <SW.Wrapper>
      <SW.HeaderText numberOfLines={1}>{topic}</SW.HeaderText>
      <ChatCommentsList discussion={discussion} />
    </SW.Wrapper>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatOverview);
