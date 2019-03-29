import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('AttachmentNoteViewer', {
  Wrapper: {
    _flex: ['column', 'center', 'flex-start'],
    _size: ['100%', '100%'],
  },
  Title: {
    _el: Text,
    fontSize: 25,
  },
  LoaderContainer: {
    marginTop: 5,
  },
});
