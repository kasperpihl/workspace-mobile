import React from 'react';
import { Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import Icon from 'src/react/Icon/Icon';
import merge from 'deepmerge';
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

  const viewAttachment = async attachment => {
    if (type === 'url') {
      return Linking.openURL(attachment.id);
    }

    if (type === 'note') {
      const AttachmentsNoteViewerStack =
        navigationComponents.AttachmentsNoteViewerStack;
      const AttachmentsNoteViewer = merge(
        navigationComponents.AttachmentsNoteViewer,
        {
          passProps: {
            attachment,
          },
        }
      );

      AttachmentsNoteViewerStack.stack.children = [
        {
          component: AttachmentsNoteViewer,
        },
      ];

      return Navigation.showModal(AttachmentsNoteViewerStack);
    }

    if (type === 'file') {
      const AttachmentViewerStack = navigationComponents.AttachmentViewerStack;
      const AttachmentViewer = merge(navigationComponents.AttachmentViewer, {
        passProps: {
          attachment,
        },
      });

      AttachmentViewerStack.stack.children = [
        {
          component: AttachmentViewer,
        },
      ];

      return Navigation.showModal(AttachmentViewerStack);
    }

    return;
  };

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
