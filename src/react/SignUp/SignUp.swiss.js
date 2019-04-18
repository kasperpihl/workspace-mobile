import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('SignUp', {
  Wrapper: {
    _flex: ['column', 'center', 'space-between'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  FooterWrapper: {
    _flex: ['row', 'center', 'flex-end'],
    flex: 1.5,
  },
  FooterText: {
    _el: Text,
    _textType: 'bodyLight',
  },
});
