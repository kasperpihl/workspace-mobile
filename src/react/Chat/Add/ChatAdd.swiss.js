import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatAdd', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  FormWrapper: {
    _size: ['100%'],
    // flex: 1,
  },
  HeaderTextWrapper: {
    _flex: ['column', 'center', 'center'],
    _size: ['100%', 'auto'],
    paddingBottom: 50,
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
  },
});
