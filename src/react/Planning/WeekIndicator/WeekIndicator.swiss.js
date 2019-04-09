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
      _border: [1, '$sw3'],
    },
    current: {
      _border: [1, '$green'],
    },
    margin: {
      marginLeft: 5,
    },
  },
  Day: {
    _el: Text,
    _textType: 'captionDark',
  },
  MonthLabel: {
    _el: Text,
    _textType: 'captionLight',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
});
