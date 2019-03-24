import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import timeGetDayOrTime from 'core/utils/time/timeGetDayOrTime';
import userGetFirstName from 'core/utils/user/userGetFirstName';
import teamGetBelonging from 'core/utils/team/teamGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './ChatListItem.swiss';

export default function ChatListItem({ item, myId }) {
  const {
    title,
    last_comment,
    last_comment_at,
    last_comment_by,
    followers,
    owned_by,
  } = item;
  const firstName = userGetFirstName(last_comment_by, owned_by);
  const teamName = teamGetBelonging(owned_by);
  const ts = followers[myId];
  const unread = ts === 'n' || ts < last_comment_at;

  const handleListClick = discussion => () => {
    Navigation.push('ChatList', {
      component: merge(navigationComponents.ChatOverview, {
        passProps: {
          discussion,
        },
      }),
    });
  };

  return (
    <TouchableOpacity onPress={handleListClick(item)}>
      <SW.Wrapper>
        <SW.LeftSide>
          <SW.UnreadDot unread={unread} />
        </SW.LeftSide>
        <SW.RightSide>
          <SW.TopicRow>
            <SW.TopicText>
              <SW.LineOfText numberOfLines={1} topic>
                {title}
              </SW.LineOfText>
            </SW.TopicText>
            <SW.TopicLastCommentTime>
              <SW.LineOfText alignRight>
                {timeGetDayOrTime(last_comment_at)}
              </SW.LineOfText>
            </SW.TopicLastCommentTime>
          </SW.TopicRow>
          <SW.LineOfText team numberOfLines={1}>
            {teamName}
          </SW.LineOfText>
          <SW.LineOfText text numberOfLines={2}>
            {firstName}: {last_comment}
          </SW.LineOfText>
        </SW.RightSide>
      </SW.Wrapper>
    </TouchableOpacity>
  );
}
