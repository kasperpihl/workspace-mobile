import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('SignUp', {
  Wrapper: {
    _flex: ['column', 'center', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  FooterWrapper: {
    _flex: ['row', 'center', 'flex-end'],
    paddingBottom: 15,
  },
  FooterText: {
    _el: Text,
    _textType: 'bodyLight',
  },
});
