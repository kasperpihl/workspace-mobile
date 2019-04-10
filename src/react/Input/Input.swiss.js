import { styleSheet } from 'swiss-react';
import { Text, TextInput, TouchableOpacity } from 'react-native';

export default styleSheet('Input', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', 'auto'],
  },
  TextInput: {
    _el: TextInput,
    _size: ['100%', 'auto'],
    _border: [1, '$sw4', 'bottom'],
    _padding: [10, 0],
    _textType: 'header3',
    focused: {
      _border: [1, '$dark', 'bottom'],
    },
  },
  PassToggle: {
    _el: TouchableOpacity,
    _size: [20, 20],
    _borderRadius: 10,
    position: 'absolute',
    right: 0,
    top: 15,
    zIndex: 1,
    backgroundColor: '$blue',
  },
});
