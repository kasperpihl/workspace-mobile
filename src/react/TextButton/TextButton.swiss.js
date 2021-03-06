import { styleSheet } from 'swiss-react';
import { TouchableOpacity, Text, Platform } from 'react-native';

export default styleSheet('TextButton', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['row', 'flex-start', 'center'],
    _size: get => {
      const height = get('height');
      return ['auto', height || 44];
    },
    paddingLeft: 7,
    paddingRight: Platform.OS === 'android' ? 20 : 0,
  },
  Title: {
    _el: Text,
    _textType: get => get('textType'),
  },
});
