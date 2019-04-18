import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('IconTouchableWrapper', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: 'center',
    _size: get => get('size') || 44,
    small: {
      _size: 34,
    },
    backButton: {
      _size: 12,
    },
    buttonIcon: {
      _size: 21,
    },
  },
});
