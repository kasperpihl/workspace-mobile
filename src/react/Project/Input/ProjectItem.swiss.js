import { styleSheet } from 'swiss-react';
import { TextInput } from 'react-native';

export default styleSheet('ProjectInput', {
  Wrapper: {
    _size: ['100%', 'auto'],
    _flex: ['row'],
  },
  InnerWrapper: {
    _flex: ['row'],
    flex: 1,
  },
  IndentSpace: {
    _size: [0, '100%'],
    _border: ['1', '$sw2', 'left'],
    marginLeft: 21,
  },
  MarginForExpandArrow: {
    marginLeft: props => {
      return props.hasChildren ? 0 : 44;
    },
  },
  Circle: {
    _size: ['22', '22'],
    _border: ['1', '$blue'],
    _borderRadius: 11,
    margin: 11,
  },
  Input: {
    _el: TextInput,
    flex: 1,
    marginTop: 9,
  },
});
