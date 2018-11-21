import { styleSheet } from 'swiss-react';
import { TextInput } from 'react-native';

export default styleSheet('ProjectInput', {
  Input: {
    _el: TextInput,
    _size: ['100%', 'auto'],
    // _border: ['1', 'red'],
    alignSelf: 'flex-end',
    bottom: 0,
    paddingLeft: props => {
      return props.indent * 10;
    },
  },
});
