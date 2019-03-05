import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('KeyboardAssignUserItem', {
  Wrapper: {
    _el: TouchableOpacity,
    _border: ['1', '$sw3', 'bottom'],
  },
});
