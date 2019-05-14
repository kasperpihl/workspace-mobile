import React from 'react';
import Icon from 'src/react/Icon/Icon';
import viewAttachment from 'src/utils/viewAttachment';
import SW from './ChatAttachment.swiss';

export default function ChatAttachment({ attachment }) {
  const { title, type } = attachment;
  let icon;

  switch (type) {
    case 'url':
      icon = 'Link';
      break;
    case 'note':
      icon = 'Note';
      break;
    case 'file':
      icon = 'File';
  }

  return (
    <SW.Wrapper
      onPress={() => {
        viewAttachment(attachment);
      }}
    >
      <SW.IconWrapper>
        <Icon name={icon} fill="dark" />
      </SW.IconWrapper>
      <SW.Title numberOfLines={1}>{title}</SW.Title>
    </SW.Wrapper>
  );
}
