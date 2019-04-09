import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectOverview', {
  Wrapper: {
    _size: ['100%', 'auto'],
    flex: 1,
  },
  HeaderText: {
    _el: Text,
    _padding: [0, 20],
    _textType: 'header1',
  },
  LoaderContainer: {
    _flex: 'center',
    flex: 1,
  },
});
