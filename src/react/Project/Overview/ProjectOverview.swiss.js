import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('ProjectOverview', {
  Wrapper: {
    _size: ['100%', 'auto'],
    flex: 1,
  },
  SliderWrapper: {
    _size: ['100%', 'auto'],
    _padding: [0, 30],
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
});
