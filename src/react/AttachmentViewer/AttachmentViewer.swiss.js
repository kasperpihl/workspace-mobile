import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('AttachmentViewer', {
  Wrapper: {
    _flex: ['column', 'center', 'center'],
    _size: ['100%', '100%'],
    flex: 1,
  },
  Title: {
    _el: Text,
    fontSize: 25,
  },
  LoaderContainer: {
    _flex: 'center',
    flex: 1,
  },
});
