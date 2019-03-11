import React from 'react';
import { Linking } from 'react-native';
import SW from './ChatAttachment.swiss';

export default function ChatAttachment({ attachment }) {
  const { title } = attachment;

  const viewAttachment = attachment => {
    if (attachment.type === 'url') {
      return Linking.openURL(attachment.id);
    }

    console.log(attachment);
  };

  return (
    <SW.Wrapper
      onPress={() => {
        viewAttachment(attachment);
      }}
    >
      <SW.Title>{title}</SW.Title>
    </SW.Wrapper>
  );
}
