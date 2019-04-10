import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('Picker', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', 'auto'],
  },
  PickerItem: {
    _el: TouchableOpacity,
    _flex: ['column', 'flex-start', 'center'],
    _size: ['100%', 50],
    _padding: [0, 0, 0, 5],
    _textType: 'header3',
    borderRadius: 3,

    selected: {
      backgroundColor: '$green2',
    },
  },
  Label: {
    _el: Text,
    _textType: 'header3',
    borderRadius: 3,
  },
});
