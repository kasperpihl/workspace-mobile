import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import merge from 'deepmerge';
import timeGetDayOrTime from 'core/utils/time/timeGetDayOrTime';
import teamGetBelonging from 'core/utils/team/teamGetBelonging';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import SW from './ChatListItem.swiss';

export default function ChatListItem({ item, myId }) {
  const { title, last_comment_at, members, owned_by } = item;
  const teamName = teamGetBelonging(owned_by);
  const ts = members[myId];
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
        </SW.RightSide>
      </SW.Wrapper>
    </TouchableOpacity>
  );
}
