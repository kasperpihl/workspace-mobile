import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatOverview', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
  },
  HeaderText: {
    _el: Text,
    _padding: [0, 20],
    fontSize: '30',
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'black',
  },
});
