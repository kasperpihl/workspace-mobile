import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectList', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
  FlatListWrapper: {
    marginTop: 20,
  },
});
