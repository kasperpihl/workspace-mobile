import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('ChatAttachment', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['row'],
    _padding: 10,
    _border: [1, '$sw3'],
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  Title: {
    _el: Text,
    _textType: 'bodyBold',
  },
});
