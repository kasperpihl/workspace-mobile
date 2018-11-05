import { styleSheet } from 'swiss-react';
import { Text, Slider, TouchableOpacity } from 'react-native';

export default styleSheet('Project', {
  Wrapper: {
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
  },
  SliderWrapper: {
    _size: ['100', 'auto'],
    position: 'absolute',
    bottom: '0',
    right: '20',
    zIndex: '1',
  },
});
