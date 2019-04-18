import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('LogoHeader', {
  Wrapper: {
    _flex: ['column', 'center'],
    _size: ['100%', 'auto'],
  },
  Title: {
    _el: Text,
    _textType: 'header1',
  },
  Subtitle: {
    _el: Text,
    _textType: 'header3Light',
  },
});
