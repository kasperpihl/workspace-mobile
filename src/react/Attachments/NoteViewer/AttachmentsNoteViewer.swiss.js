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
  NotSupportedWrapper: {
    _flex: 'center',
    _size: '100%',
    flex: 1,
    padding: 20,
  },
  NotSupported: {
    _el: Text,
  },
  LoaderContainer: {
    marginTop: 5,
  },
  WebViewWrapper: {
    flex: 1,
    width: '100%',
  },
});
