import { styleSheet } from 'swiss-react';
import { TouchableOpacity, Text } from 'react-native';

export default styleSheet('Tabs', {
  Wrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 44],
    _border: [1, '$sw3', 'bottom'],
  },
  Tab: {
    _el: TouchableOpacity,
    _flex: ['row', 'flex-start', 'center'],
    _size: ['auto', 44],
    marginLeft: 20,
  },
  TabText: {
    _el: Text,
    _textType: 'captionLight',
    selected: {
      _textType: 'captionDark',
    },
  },
});
