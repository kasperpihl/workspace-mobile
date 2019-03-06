import React from 'react';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import SW from './ChatCommentItem.swiss';

export default function ChatCommentItem({ comment, organizationId }) {
  const { message, sent_by } = comment;

  // console.log(comment);

  return (
    <SW.Wrapper>
      <SW.Left>
        <AssigneeImage userId={sent_by} organizationId={organizationId} />
      </SW.Left>
      <SW.Right>
        <SW.Message>{message}</SW.Message>
      </SW.Right>
    </SW.Wrapper>
  );
}
