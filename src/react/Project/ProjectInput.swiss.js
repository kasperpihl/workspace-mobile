import { styleSheet } from 'swiss-react';
import { TextInput } from 'react-native';

export default styleSheet('Project', {
  Input: {
    _el: TextInput,
    paddingLeft: props => {
      return props.indent * 10;
    },
  },
});
