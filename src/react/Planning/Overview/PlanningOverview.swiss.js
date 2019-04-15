import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('PlanningOverview', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
  },
  HeaderText: {
    _el: Text,
    _textType: 'header1',
    _padding: [0, 20],
  },
  GreyBorder: {
    _size: ['100%', 1],
    marginTop: 14,
    backgroundColor: '$sw4',
  },
});
