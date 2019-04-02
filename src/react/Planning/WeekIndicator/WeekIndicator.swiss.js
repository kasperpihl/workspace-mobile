import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('WeekIndicator', {
  Wrapper: {
    _flex: ['column', 'center', 'center'],
    marginTop: 20,
  },
  Week: {
    _flex: ['row', 'left', 'center'],
    height: 36,
    marginTop: 10,
  },
  DayWrapper: {
    _flex: ['row', 'center', 'center'],
    _size: 36,
    _border: [1, '$green2'],
    borderRadius: 2,
    border: '1px solid $green2',
    past: {
      _border: [1, '$sw4'],
    },
    current: {
      _border: [1, '$green1'],
    },
    margin: {
      marginLeft: 5,
    },
  },
  Day: {
    _el: Text,
    color: '$dark',
  },
  MonthLabel: {
    _el: Text,
    color: '$sw2',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
});
