import { styleSheet } from 'swiss-react';
import { TouchableOpacity, Text } from 'react-native';

export default styleSheet('TopBarTouchableWrapper', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: 'center',
    _padding: [0, 20],
  },
  Title: {
    _el: Text,
    _textType: get => get('textType'),
  },
});
