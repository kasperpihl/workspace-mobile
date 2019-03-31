import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('AttachmentNoteViewer', {
  Wrapper: {
    _flex: ['column', 'flex-start', 'flex-start'],
    _size: ['100%', '100%'],
    padding: 5,
  },
  Title: {
    _el: Text,
    fontSize: 25,
    marginLeft: 10,
  },
  LoaderContainer: {
    marginTop: 5,
  },
  WebViewWrapper: {
    flex: 1,
    width: '100%',
  },
});
