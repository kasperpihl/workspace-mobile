import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('ChatAttachment', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['row', 'flex-start', 'center'],
    _border: [1, '$sw3'],
    _padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  Title: {
    _el: Text,
    _textType: 'bodyBold',
    maxWidth: 150,
  },
  IconWrapper: {
    _flex: 'center',
    width: 20,
    height: 20,
    paddingRight: 10,
  },
});
