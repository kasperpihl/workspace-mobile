import { styleSheet } from 'swiss-react';
import { TextInput } from 'react-native';

export default styleSheet('ProjectInput', {
  Input: {
    _el: TextInput,
    paddingLeft: props => {
      return props.indent * 10;
    },
    _border: ['1', 'red'],
  },
});
