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
    _size: ['100%', '50'],
    _padding: [0, 0, 0, 5],
    fontSize: '15',

    border: {
      _border: ['1', '$sw3', 'bottom'],
    },

    selected: {
      backgroundColor: '$sw4',
    },
  },
  Label: {
    _el: Text,
    fontSize: '15',
    color: '$sw1',
  },
});
