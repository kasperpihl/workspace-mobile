import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ForgottenPassword', {
  Wrapper: {
    _flex: ['column', 'center', 'space-between'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  FormWrapper: {
    _size: ['100%'],
    flex: 1.7,
  },
  CopyText: {
    _el: Text,
    _textType: 'header3Dark',
    marginTop: 30,
  },
  FooterWrapper: {
    _flex: ['row', 'center', 'flex-end'],
    flex: 1.5,
  },
});
