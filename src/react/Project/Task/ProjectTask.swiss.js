import { styleSheet } from 'swiss-react';
import { TextInput, TouchableOpacity } from 'react-native';

export default styleSheet('ProjectInput', {
  Wrapper: {
    _size: ['100%', 'auto'],
    _flex: ['row'],
  },
  InnerWrapper: {
    _flex: ['row', 'flex-start'],
    flex: 1,
    marginTop: 2,
  },
  IndentSpace: {
    _size: [0, '100%'],
    // _border: [1, '$sw3', 'left'],
    // highlight: {
    //   _border: ['1', '$sw1', 'left'],
    // },
    marginLeft: 17,
  },
  MarginForExpandArrow: {
    marginLeft: get => (get('hasChildren') ? 0 : 34),
  },
  CircleWrapper: {
    _el: TouchableOpacity,
    _flex: ['row', 'center', 'flex-start'],
    _size: [34, 34],
    _borderRadius: 17,
  },
  Circle: {
    _flex: 'center',
    _size: [18, 18],
    _border: [1, '$green'],
    _borderRadius: 11,

    completion: {
      backgroundColor: '$green',
    },
  },
  Input: {
    _el: TextInput,
    _textType: 'header3',
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    textAlignVertical: 'top',
  },
});
