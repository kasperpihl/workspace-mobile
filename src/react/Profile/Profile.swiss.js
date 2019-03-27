import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('Profile', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
    color: 'black',
  },
  ButtonWrapper: {
    _el: TouchableOpacity,
    _flex: ['column', 'center'],
    _size: ['100%', '44'],
  },
  Button: {
    _el: Text,
    color: 'red',
    fontSize: '18',
  },
});
