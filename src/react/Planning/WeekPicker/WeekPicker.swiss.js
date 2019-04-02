import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('WeekPicker', {
  Wrapper: {
    _size: ['100%', 'auto'],
    _flex: ['column', 'center', 'center'],
  },
  ButtonsLabelWrapper: {
    _size: ['100%', 'auto'],
    _flex: ['row', 'center', 'center'],
  },
  WeekLabel: {
    _el: Text,
    _size: ['100', 'auto'],
    color: '$sw2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  NextArrowPlaceholder: {
    _size: 44,
  },
});
