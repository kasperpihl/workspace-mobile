import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('Profile', {
  Wrapper: {
    _flex: ['column', 'flex-start', 'space-between'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  InfoWrapper: {
    _flex: ['column', 'center'],
    _size: ['100%', 'auto'],
  },
  HeaderText: {
    _el: Text,
    _textType: 'header1',
    marginTop: 20,
  },
  Email: {
    _el: Text,
    _textType: 'header3Light',
  },
  ButtonWrapper: {
    _flex: ['column', 'flex-end'],
    _size: ['100%', 44],
    marginBottom: 20,
  },
});
