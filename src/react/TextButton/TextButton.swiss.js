import { styleSheet } from 'swiss-react';
import { TouchableOpacity, Text } from 'react-native';

export default styleSheet('TextButton', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: 'center',
    _size: get => {
      const height = get('height');
      return ['auto', height || 44];
    },
    _padding: [0, 3],
    right: {
      _padding: [0, 20],
    },
  },
  Title: {
    _el: Text,
    _textType: get => get('textType'),
  },
});
