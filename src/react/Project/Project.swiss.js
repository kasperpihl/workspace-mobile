import { styleSheet } from 'swiss-react';
import { Text, Slider, TouchableOpacity } from 'react-native';

export default styleSheet('Project', {
  Wrapper: {
    _size: ['100%', '100%'],
    _padding: [0, 20],
    paddingRight: 0,
    backgroundColor: 'red',
  },
  SliderWrapper: {
    _size: ['100', 'auto'],
    position: 'absolute',
    bottom: '10',
    right: '20',
    zIndex: '1',
  },
});
