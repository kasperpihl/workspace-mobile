import React from 'react';
import { TouchableOpacity } from 'react-native';
import timeGetDayOrTime from 'swipes-core-js/utils/time/timeGetDayOrTime';
import userGetFirstName from 'swipes-core-js/utils/user/userGetFirstName';
import orgGetBelonging from 'swipes-core-js/utils/org/orgGetBelonging';
import SW from './ChatListItem.swiss';

export default function ChatListItem({ item }) {
  const {
    topic,
    last_comment,
    last_comment_at,
    last_comment_by,
    owned_by,
  } = item;
  const unread = false;
  const firstName = userGetFirstName(last_comment_by, owned_by);
  const orgName = orgGetBelonging(owned_by);

  return (
    <TouchableOpacity>
      <SW.Wrapper>
        <SW.LeftSide>
          <SW.UnreadDot />
        </SW.LeftSide>
        <SW.RightSide>
          <SW.TopicRow>
            <SW.TopicText>
              <SW.LineOfText numberOfLines={1} topic unread={unread}>
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
