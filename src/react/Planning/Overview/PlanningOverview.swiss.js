import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('PlanningOverview', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  TopWrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 44],
  },
  IconWrapper: {
    _size: 44,
    toggle: {
      backgroundColor: '$green1',
    },
  },
  HeaderText: {
    _el: Text,
    flex: 1,
    fontSize: '30',
    fontWeight: 'bold',
    paddingBottom: 20,
    color: 'black',
  },
});
