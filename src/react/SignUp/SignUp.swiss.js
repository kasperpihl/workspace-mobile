import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('SignUp', {
  Wrapper: {
    _flex: ['column', 'center', 'space-between'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  HeaderTextWrapper: {
    _flex: ['column', 'center', 'center'],
    flex: 0.5,
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
    color: 'black',
  },
  FooterWrapper: {
    _flex: ['column', 'center', 'center'],
    flex: 1.5,
  },
  FooterText: {
    _el: Text,
    fontSize: '15',
    color: '$sw1',
  },
});
