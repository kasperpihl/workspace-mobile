import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

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
  Item: {
    _el: Text,
    paddingLeft: props => {
      return props.indent * 10;
    },
  },
});
