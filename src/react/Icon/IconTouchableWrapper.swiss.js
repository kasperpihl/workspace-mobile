import { styleSheet } from 'swiss-react';
import { TouchableOpacity, Platform } from 'react-native';

export default styleSheet('IconTouchableWrapper', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: 'center',
    _size: get => get('size') || 44,
    topbar: {
      _size: Platform.OS === 'android' ? 44 : 34,
    },
    arrow: {
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
