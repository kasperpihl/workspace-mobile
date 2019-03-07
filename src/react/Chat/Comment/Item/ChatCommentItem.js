import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import userGetFirstName from 'core/utils/user/userGetFullName';
import request from 'core/utils/request';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import useDebounce from 'src/react/_hooks/useDebounce';
import SW from './ChatCommentItem.swiss';

function ChatCommentItem({ myId, comment, organizationId }) {
  const { comment_id, discussion_id, message, sent_by, reactions } = comment;
  const likedByMe = reactions[myId] || false;
  const originalNumberOfLikes = Object.keys(reactions).length || null;
  const [like, setLike] = useState(likedByMe);
  const [numberOfLikes, setNumberOfLikes] = useState(originalNumberOfLikes);
  const icon = like ? 'heart_full' : 'heart_empty';
  const iconColor = like ? 'red' : 'sw2';

  useEffect(() => {
    setNumberOfLikes(originalNumberOfLikes);
  }, [originalNumberOfLikes]);

  const [setCallback] = useDebounce(500, numberOfLikes);

  const handleLike = () => {
    setLike(!like);

    let newNumberOfLikes = numberOfLikes;
    if (!like) {
      newNumberOfLikes++;
    } else {
      newNumberOfLikes--;
    }

    if (newNumberOfLikes === 0) newNumberOfLikes = null;

    setNumberOfLikes(newNumberOfLikes);

    setCallback(() => {
      request('comment.react', {
        comment_id,
        discussion_id,
        reaction: !like ? 'like' : null,
      });
    });
  };

  return (
    <SW.Wrapper>
      <SW.Row>
        <SW.Left>
          <AssigneeImage
            userId={sent_by}
            size={34}
            organizationId={organizationId}
          />
        </SW.Left>
        <SW.Right>
          <SW.Row>
            <SW.Name>{userGetFirstName(sent_by, organizationId)}</SW.Name>
            <SW.Time>10:30</SW.Time>
          </SW.Row>
          <SW.Message>{message}</SW.Message>
        </SW.Right>
      </SW.Row>
      <SW.Row>
        <IconTouchableWrapper
          icon={icon}
          fill={iconColor}
          width="14"
          height="14"
          style={{
            marginLeft: 30,
          }}
          onPress={() => {
            handleLike();
          }}
        />
        <SW.HeartCount>{numberOfLikes}</SW.HeartCount>
      </SW.Row>
    </SW.Wrapper>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatCommentItem);
