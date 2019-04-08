import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('Input', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['column', 'center'],
    _size: ['100%', 'auto'],
  },
  Button: {
    _size: ['100%', 'auto'],
    _flex: ['center'],
    _padding: [20, 0],
    _borderRadius: 4,
    backgroundColor: '$blue',
  },
  ButtonText: {
    _el: Text,
    fontSize: '10',
    fontWeight: 'bold',
    color: '$base',
  },
});
