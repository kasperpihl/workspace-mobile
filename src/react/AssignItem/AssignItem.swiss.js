import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('AssignItem', {
  Wrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 44],
    _padding: 5,
  },
  RightButton: {
    marginLeft: 'auto',
  },
  FullName: {
    _el: Text,
    marginLeft: 5,
  },
});
