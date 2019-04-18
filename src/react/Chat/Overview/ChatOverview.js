import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import request from 'core/utils/request';
import useRequest from 'core/react/_hooks/useRequest';
import ChatCommentsList from 'src/react/Chat/Comment/List/ChatCommentList';
import ChatCommentComposer from 'src/react/Chat/Comment/Composer/ChatCommentComposer';
import SW from './ChatOverview.swiss';

function ChatOverview({ discussion, myId }) {
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

  const backButton = {
    id: 'Back',
    component: {
      name: 'TextButton',
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
        <ChatCommentComposer
          discussionId={discussion.discussion_id}
          ownedBy={discussion.owned_by}
        />
      </SW.Wrapper>
    </KeyboardAvoidingView>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatOverview);
