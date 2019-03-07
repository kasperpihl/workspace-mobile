import React from 'react';
import userGetFirstName from 'core/utils/user/userGetFullName';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import SW from './ChatCommentItem.swiss';

export default function ChatCommentItem({ comment, organizationId }) {
  const { message, sent_by } = comment;

  // console.log(comment);

  return (
    <SW.Wrapper>
      <SW.Left>
        <AssigneeImage
          userId={sent_by}
          size={34}
          organizationId={organizationId}
        />
      </SW.Left>
      <SW.Right>
        <SW.NameTimeRow>
          <SW.Name>{userGetFirstName(sent_by, organizationId)}</SW.Name>
          <SW.Time>10:30</SW.Time>
        </SW.NameTimeRow>
        <SW.Message>{message}</SW.Message>
      </SW.Right>
    </SW.Wrapper>
  );
}
