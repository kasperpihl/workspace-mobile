import React, { useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { List } from 'immutable';
import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePickerAndroid from 'react-native-image-picker';
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
        icon={'Send'}
        fill={'sw2'}
        onPress={handleSubmitMessage}
      />
    );
  };

  const uploadImageToS3 = async fileFromPicker => {
    setUploadLoading(true);
    const fileRes = await uploadFile(fileFromPicker, ownedBy);

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

    if (Platform.OS === 'ios') {
      // Module is creating tmp images which are going to be cleaned up
      // automatically somewhere in the future. If you want to force cleanup,
      // you can use clean to clean all tmp files
      ImagePicker.clean();
    }
  };

  const openiOSImagePicker = () => {
    ImagePicker.openPicker({
      multiple: true, // T_TODO should be false on Android
      maxFiles: 1,
    }).then(files => {
      uploadImageToS3(files[0]);
    });
  };

  const openAndroidImagePicker = () => {
    ImagePickerAndroid.showImagePicker({}, response => {
      if (!response.data) {
        return;
      }

      const file = response;
      file.mime = response.type;
      file.filename = response.fileName;
      file.path = response.uri;

      uploadImageToS3(file);
    });
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
          onPress={() => {
            if (loading) {
              return;
            }

            if (Platform.OS === 'ios') {
              openiOSImagePicker();
            }

            if (Platform.OS === 'android') {
              openAndroidImagePicker();
            }
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
