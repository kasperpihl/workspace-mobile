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
  HeaderTextWrapper: {
    _flex: ['column', 'center', 'center'],
    flex: 1,
  },
  HeaderText: {
    _el: Text,
    _textType: 'header1',
  },
  CopyText: {
    _el: Text,
    marginTop: '10',
    fontSize: '15',
    color: '$sw1',
  },
});
