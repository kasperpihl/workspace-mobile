import { Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
import merge from 'deepmerge';

export default (viewAttachment = async attachment => {
  const { id, type } = attachment;
  if (type === 'url') {
    return Linking.openURL(id);
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
});
