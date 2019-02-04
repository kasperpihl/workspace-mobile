import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('KeyboardAssignUserItem', {
  Wrapper: {
    _el: TouchableOpacity,
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', '44'],
    _padding: '5',
    _border: ['1', '$sw3', 'bottom'],
  },
  Circle: {
    _size: ['22', '22'],
    _border: ['1', '$sw3'],
    _borderRadius: 11,
    backgroundColor: '$sw3',
    marginRight: '5',
  },
  RightButton: {
    marginLeft: 'auto',
  },
});
