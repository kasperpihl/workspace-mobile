import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { List } from 'immutable';
import ImagePicker from 'react-native-image-crop-picker';
import request from 'core/utils/request';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import colors from 'src/utils/colors';
import uploadFile from 'src/utils/uploadFile';
import SW from './ChatCommentComposer.swiss';

export default function ChatCommentComposer({ discussionId, ownedBy }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitMessage = () => {
    const attachments = List([]);

    setLoading(true);
    request('comment.add', {
      discussion_id: discussionId,
      attachments,
      message,
    }).then(res => {
      setLoading(false);
      // T_TODO show error if something goes wrong
    });

    setMessage('');
  };

  renderSendIcon = () => {
    if (loading) {
      return (
        <SW.LoaderContainer>
          <ActivityIndicator size="small" color={colors['blue']} />
        </SW.LoaderContainer>
      );
    }

    return (
      <IconTouchableWrapper
        icon={'send'}
        fill={'sw2'}
        width="21"
        height="21"
        onPress={handleSubmitMessage}
      />
    );
  };

  return (
    <SW.Wrapper>
      <SW.InputWrapper>
        <SW.Input
          multiline
          placeholder="Aa"
          value={message}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <IconTouchableWrapper
          icon={'attach'}
          fill={'sw2'}
          width="13"
          height="21"
          onPress={() => {
            ImagePicker.openPicker({
              multiple: true,
            }).then(async files => {
              const fileRes = await uploadFile(files[0], ownedBy);
              console.log(fileRes);
            });
          }}
        />
      </SW.InputWrapper>
      <SW.SendIconWrapper>{renderSendIcon()}</SW.SendIconWrapper>
    </SW.Wrapper>
  );
}

// export default connect(state => ({
//   myId: state.me.get('user_id'),
// }))(ChatOverview);
