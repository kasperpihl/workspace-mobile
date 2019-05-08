import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('FormButton', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['column', 'center'],
    _size: ['100%', 'auto'],
  },
  Button: {
    _size: ['100%', 48],
    _flex: 'center',
    _border: [1, 'green'],
    _borderRadius: 2,
  },
  ButtonText: {
    _el: Text,
    _textType: 'header3',
  },
});
