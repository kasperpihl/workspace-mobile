import { styleSheet } from 'swiss-react';
import { TextInput } from 'react-native';

export default styleSheet('ChatCommentComposer', {
  Wrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 'auto'],
    _border: [2, '$sw4', 'top'],
    _padding: 10,
  },
  InputWrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _borderRadius: 20,
    _border: [1, '$sw3'],
    flex: 1,
    minHeight: 30,
  },
  Input: {
    _el: TextInput,
    _padding: 10,
    marginTop: 5,
    width: '100%',
    maxHeight: 100,
  },
  IconWrapper: {
    _size: ['60', '25'],
    backgroundColor: 'blue',
  },
});
