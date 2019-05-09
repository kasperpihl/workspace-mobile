import { styleSheet } from 'swiss-react';
import { TextInput, TouchableOpacity } from 'react-native';

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
    paddingRight: 44,
    _textType: 'header3ForInputs',
    focused: {
      _border: [1, '$dark', 'bottom'],
    },
  },
  PassToggle: {
    _el: TouchableOpacity,
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 1,
  },
});
