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
    _size: ['100%', '40'],
  },
});
