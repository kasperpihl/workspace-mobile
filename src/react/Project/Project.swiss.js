import { styleSheet } from 'swiss-react';
import { Text, Slider, TouchableOpacity } from 'react-native';

export default styleSheet('Project', {
  Wrapper: {
    _size: ['100%', '100%'],
  },
  SliderWrapper: {
    _size: ['100', 'auto'],
    position: 'absolute',
    bottom: '10',
    right: '20',
    zIndex: '1',
  },
  ToolbarWrapper: {
    _flex: ['row'],
    _size: ['100%', '40'],
    backgroundColor: 'red',
    opacity: props => {
      return props.toolBaralwaysVisible ? 1 : 0;
    },
  },
  ChangeKeyboard: {
    _el: TouchableOpacity,
    _size: ['40', '40'],
    _borderRadius: '20',
    backgroundColor: '$blue',
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
});
