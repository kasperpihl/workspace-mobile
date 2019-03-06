import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import timeGetDayOrTime from 'core/utils/time/timeGetDayOrTime';
import userGetFirstName from 'core/utils/user/userGetFirstName';
import orgGetBelonging from 'core/utils/org/orgGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './ChatListItem.swiss';

export default function ChatListItem({ item, myId }) {
  const {
    discussion_id,
    topic,
    last_comment,
    last_comment_at,
    last_comment_by,
    followers,
    owned_by,
  } = item;
  const firstName = userGetFirstName(last_comment_by, owned_by);
  const orgName = orgGetBelonging(owned_by);
  const ts = followers[myId];
  const unread = ts === 'n' || ts < last_comment_at;

  const handleListClick = discussionId => () => {
    Navigation.push('ChatList', {
      component: merge(navigationComponents.ChatOverview, {
        passProps: {
          discussionId,
        },
      }),
    });
  };

  return (
    <TouchableOpacity onPress={handleListClick(discussion_id)}>
      <SW.Wrapper>
        <SW.LeftSide>
          <SW.UnreadDot unread={unread} />
        </SW.LeftSide>
        <SW.RightSide>
          <SW.TopicRow>
            <SW.TopicText>
              <SW.LineOfText numberOfLines={1} topic>
                {topic}
              </SW.LineOfText>
            </SW.TopicText>
            <SW.TopicLastCommentTime>
              <SW.LineOfText alignRight>
                {timeGetDayOrTime(last_comment_at)}
              </SW.LineOfText>
            </SW.TopicLastCommentTime>
          </SW.TopicRow>
          <SW.LineOfText organization numberOfLines={1}>
            {orgName}
          </SW.LineOfText>
          <SW.LineOfText text numberOfLines={2}>
            {firstName}: {last_comment}
          </SW.LineOfText>
        </SW.RightSide>
      </SW.Wrapper>
    </TouchableOpacity>
  );
}
