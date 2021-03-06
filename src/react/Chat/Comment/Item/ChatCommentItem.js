import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';
import userGetFirstName from 'core/utils/user/userGetFullName';
import request from 'core/utils/request';
import ChatAttachment from 'src/react/Chat/Attachment/ChatAttachment';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import useDebounce from 'src/react/_hooks/useDebounce';
import colors from 'src/utils/colors';
import SW from './ChatCommentItem.swiss';

// If I make ParsedText to work with custom components
// then I can use swiss <3 but for now that's fast
// and it's working
const styles = StyleSheet.create({
  nameLabel: {
    color: colors['sw1'],
  },
  url: {
    color: colors['blue'],
  },
});

function ChatCommentItem({ myId, comment, teamId }) {
  const {
    comment_id,
    discussion_id,
    sent_by,
    reactions,
    sent_at,
    deleted,
  } = comment;
  let { message } = comment;

  if (deleted) {
    message = 'This message has been deleted';
  }

  const likedByMe = reactions[myId] || false;
  const originalNumberOfLikes = Object.keys(reactions).length || null;
  const [like, setLike] = useState(likedByMe);
  const [numberOfLikes, setNumberOfLikes] = useState(originalNumberOfLikes);
  const icon = like ? 'HeartFull' : 'Heart';
  const iconColor = like ? 'red' : 'sw2';
  const [expanded, setExpanded] = useState(false);

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
      }).then(() => {
        window.analytics.sendEvent('Reaction added', teamId);
      });
    });
  };

  const renderAttachments = () => {
    if (!comment.attachments || comment.deleted) {
      return null;
    }

    return comment.attachments.map((attachment, i) => (
      <ChatAttachment attachment={attachment} key={i} />
    ));
  };

  const renderMessage = message => {
    const match = /<!giphy*\|(.*)\|(.*)>/g.exec(message);

    if (match !== null) {
      const [full, height, width] = /h:([0-9]*),\s?w:([0-9]*)/gm.exec(match[2]);
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
            borderRadius={5}
            overlayColor="white"
            source={{
              uri: match[1],
            }}
          />
        </SW.GifhyWrapper>
      );
    }

    return (
      <SW.Message>
        <ParsedText
          parse={[
            {
              type: 'url',
              style: styles.url,
              onPress: url => Linking.openURL(url),
            },
            {
              pattern: /<!([A-Z0-9]*)\|(.*?)>/i,
              style: styles.nameLabel,
              renderText: (matchingString, matches) => {
                return matches[2];
              },
            },
          ]}
        >
          {message}
        </ParsedText>
      </SW.Message>
    );
  };

  return (
    <SW.Wrapper
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <SW.Row>
        {sent_by !== 'USYSTEM' && (
          <SW.Left>
            <AssigneeImage
              userId={sent_by}
              size={32}
              imageSize={64}
              teamId={teamId}
            />
          </SW.Left>
        )}
        <SW.Right>
          <SW.Row>
            {sent_by !== 'USYSTEM' && (
              <SW.Name>{userGetFirstName(sent_by, teamId)}</SW.Name>
            )}
            <SW.Time system={sent_by === 'USYSTEM'}>{`${moment(sent_at).format(
              'LT'
            )}`}</SW.Time>
          </SW.Row>
          {renderMessage(message)}
        </SW.Right>
      </SW.Row>
      <SW.Row
        style={{
          paddingLeft: 39,
        }}
      >
        <SW.AttachmentsWrapper>{renderAttachments()}</SW.AttachmentsWrapper>
      </SW.Row>
      {sent_by !== 'USYSTEM' &&
        !comment.deleted &&
        (expanded || numberOfLikes > 0) && (
          <SW.Row>
            <IconTouchableWrapper
              key={icon}
              icon={icon}
              fill={iconColor}
              style={{
                position: 'absolute',
                zIndex: 3,
                left: 34,
              }}
              onPress={() => {
                handleLike();
              }}
            />
            <SW.HeartCount>{numberOfLikes}</SW.HeartCount>
          </SW.Row>
        )}
    </SW.Wrapper>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatCommentItem);
