import { styleSheet } from 'swiss-react';
import { TextInput, TouchableOpacity } from 'react-native';

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
    _border: ['1', '$sw3', 'left'],
    highlight: {
      _border: ['1', '$sw1', 'left'],
    },
    marginLeft: 21,
  },
  MarginForExpandArrow: {
    marginLeft: props => (props.hasChildren ? 0 : 44),
  },
  CircleWrapper: {
    _el: TouchableOpacity,
    _flex: 'center',
    _size: ['44', '44'],
    _borderRadius: 22,
  },
  Circle: {
    _size: ['22', '22'],
    _border: ['1', '$blue'],
    _borderRadius: 11,

    completion: {
      backgroundColor: '$blue',
    },
  },
  Input: {
    _el: TextInput,
    flex: 1,
    marginTop: 9,
  },
});
