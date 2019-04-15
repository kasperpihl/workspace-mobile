import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('PlanningInfo', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  Text: {
    _el: Text,
    color: 'black',
  },
});
