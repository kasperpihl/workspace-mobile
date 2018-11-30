import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('ProjectOverview', {
  Wrapper: {
    _size: ['100%', 'auto'],
    flex: 1,
  },
  ResetKeyboard: {
    _el: TouchableOpacity,
    _size: ['40', '40'],
    _borderRadius: '20',
    backgroundColor: 'green',
  },
  MyKeyBoard: {
    _size: ['100%', '100%'],
    backgroundColor: 'yellow',
  },
  SliderWrapper: {
    _size: ['100%', 'auto'],
  },
});
