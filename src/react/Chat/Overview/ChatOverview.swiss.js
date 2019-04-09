import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatOverview', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
  },
  HeaderText: {
    _el: Text,
    _textType: 'header1',
  },
});
