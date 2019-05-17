import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import request from 'core/utils/request';
import useRequest from 'core/react/_hooks/useRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import ChatCommentsList from 'src/react/Chat/Comment/List/ChatCommentList';
import ChatCommentComposer from 'src/react/Chat/Comment/Composer/ChatCommentComposer';
import SW from './ChatOverview.swiss';

function ChatOverview({ discussionFromList, myId }) {
  let discussion = discussionFromList;
  const { discussion_id, title } = discussion;
  // `mark as read` logic
  const req = useRequest(
    'discussion.get',
    {
      discussion_id,
    },
    result => {
      const { discussion } = result;
      const ts = discussion.members[myId];
      if (ts === 'n' || ts < discussion.last_comment_at) {
        request('discussion.markAsRead', {
          read_at: discussion.last_comment_at,
          discussion_id: discussion.discussion_id,
        });
      }
    }
  );

  useUpdate('discussion', update => {
    if (update.discussion_id === discussion_id) {
      req.merge('discussion', update);
    }
  });

  if (req.result) {
    discussion = req.result.discussion;
  }

  const backButton = {
    id: 'Back',
    component: {
      name: 'TextButton',
      alignment: 'fill',
      passProps: {
        backButton: true,
        icon: 'ArrowLeft',
        title: 'Chats',
        textType: 'captionDark',
        onPress: () => {
          Navigation.pop('ChatOverview');
        },
      },
    },
  };

  useEffect(() => {
    Navigation.mergeOptions('ChatOverview', {
      topBar: {
        title: backButton,
      },
    });
  }, []);

  const behavior = Platform.OS === 'android' ? '' : 'padding';

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={90} behavior={behavior}>
      <SW.Wrapper>
        <SW.HeaderText numberOfLines={1}>{title}</SW.HeaderText>
        <SW.GreyBorder />
        <ChatCommentsList discussion={discussion} />
        {!discussion.is_system && (
          <ChatCommentComposer
            discussionId={discussion.discussion_id}
            ownedBy={discussion.owned_by}
          />
        )}
      </SW.Wrapper>
    </KeyboardAvoidingView>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatOverview);
