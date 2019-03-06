import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatCommentItem', {
  Wrapper: {
    _flex: ['row'],
    _size: ['100%', 'auto'],
    _padding: [10, 20],
  },
  Left: {
    _flex: ['row'],
  },
  Right: {
    _flex: ['column'],
  },
  Message: {
    _el: Text,
    _size: ['100%', 'auto'],
  },
});
