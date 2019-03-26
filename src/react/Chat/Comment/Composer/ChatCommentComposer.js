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
  const [attachments, setAttachments] = useState(List([]));
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleSubmitMessage = () => {
    if (uploadLoading) {
      return;
    }

    setLoading(true);
    request('comment.add', {
      message,
      discussion_id: discussionId,
      attachments: attachments.toJS(),
    }).then(res => {
      setLoading(false);

      if (!res.ok) {
        // T_TODO show error if something goes wrong
      }
    });

    setMessage('');
    setAttachments(List([]));
  };

  const renderSendIcon = () => {
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

  const renderAttachIcon = () => {
    if (uploadLoading) {
      return (
        <SW.LoaderContainer>
          <ActivityIndicator size="small" color={colors['blue']} />
        </SW.LoaderContainer>
      );
    }

    return (
      <SW.AttachIconWrapper>
        {attachments.size > 0 && (
          <SW.AttachmentCounterWrapper>
            <SW.AttachmentCounter>{attachments.size}</SW.AttachmentCounter>
          </SW.AttachmentCounterWrapper>
        )}
        <IconTouchableWrapper
          icon={'attach'}
          fill={'sw2'}
          width="13"
          height="21"
          onPress={() => {
            if (loading) {
              return;
            }

            ImagePicker.openPicker({
              multiple: true, // T_TODO should be false on Android
              maxFiles: 1,
            }).then(async files => {
              setUploadLoading(true);
              const fileRes = await uploadFile(files[0], ownedBy);

              if (!fileRes.ok) {
                // T_TODO show error
                return;
              }

              const file = fileRes.file;
              setUploadLoading(false);
              setAttachments(
                attachments.push({
                  type: 'file',
                  id: file.file_id,
                  title: file.file_name,
                })
              );
            });
          }}
        />
      </SW.AttachIconWrapper>
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
        {renderAttachIcon()}
      </SW.InputWrapper>
      <SW.SendIconWrapper>{renderSendIcon()}</SW.SendIconWrapper>
    </SW.Wrapper>
  );
}
