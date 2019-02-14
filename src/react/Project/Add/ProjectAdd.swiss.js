import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectAdd', {
  Wrapper: {
    _flex: ['column', 'center', 'space-between'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  FormWrapper: {
    _size: ['100%'],
    flex: 1,
  },
  HeaderTextWrapper: {
    _flex: ['column', 'center', 'center'],
    flex: 0.3,
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
  },
  FooterWrapper: {
    flex: 0.3,
  },
});
