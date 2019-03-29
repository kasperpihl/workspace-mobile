import React from 'react';
import { Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import merge from 'deepmerge';
import SW from './ChatAttachment.swiss';

export default function ChatAttachment({ attachment, teamId }) {
  const { title } = attachment;

  const viewAttachment = async attachment => {
    if (attachment.type === 'url') {
      return Linking.openURL(attachment.id);
    }

    if (attachment.type === 'note') {
      const AttachmentsNoteViewerStack =
        navigationComponents.AttachmentsNoteViewerStack;
      const AttachmentsNoteViewer = merge(
        navigationComponents.AttachmentsNoteViewer,
        {
          passProps: {
            attachment,
            teamId,
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

    if (attachment.type === 'file') {
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
      <SW.Title>{title}</SW.Title>
    </SW.Wrapper>
  );
}
