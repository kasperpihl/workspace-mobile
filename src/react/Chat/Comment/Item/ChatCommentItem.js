import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import userGetFirstName from 'core/utils/user/userGetFullName';
import request from 'core/utils/request';
import ChatAttachment from 'src/react/Chat/Attachment/ChatAttachment';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import useDebounce from 'src/react/_hooks/useDebounce';
import SW from './ChatCommentItem.swiss';

function ChatCommentItem({ myId, comment, organizationId }) {
  const {
    comment_id,
    discussion_id,
    message,
    sent_by,
    reactions,
    sent_at,
  } = comment;
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

  const renderAttachments = () => {
    if (!comment.attachments) {
      return null;
    }

    return comment.attachments.map((attachment, i) => (
      <ChatAttachment attachment={attachment} key={i} />
    ));
  };

  const renderMessage = message => {
    const match = /<!giphy*\|(.*)\|(.*)>/g.exec(message);

    if (match) {
      const [full, height, width] = /h:([0-9]*),w:([0-9]*)/gm.exec(match[2]);
      const ratio = width / height;
      const base = 200;
      const newWidth = width > height ? base : base * ratio;
      const newHeight = width > height ? base / ratio : base;

      return (
        <SW.GifhyWrapper>
          <Image
            style={{
              height: parseInt(newHeight, 10),
              width: parseInt(newWidth, 10),
            }}
            resizeMode="contain"
            source={{
              uri: match[1],
            }}
          />
        </SW.GifhyWrapper>
      );
    }

    return <SW.Message>{message}</SW.Message>;
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
            <SW.Time>{`${moment(sent_at).format('LT')}`}</SW.Time>
          </SW.Row>
          {renderMessage(message)}
        </SW.Right>
      </SW.Row>
      <SW.Row
        style={{
          paddingLeft: 39,
        }}
      >
        {renderAttachments()}
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
