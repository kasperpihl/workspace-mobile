import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('SignIn', {
  Wrapper: {
    _flex: ['column', 'center', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  ForgotPasswordWrapper: {
    _el: TouchableOpacity,
    marginTop: 10,
  },
  ForgotPasswordText: {
    _el: Text,
    _textType: 'captionLight',
    _size: ['100%', 'auto'],
    textAlign: 'center',
  },
  FooterWrapper: {
    _flex: ['row', 'center', 'flex-end'],
    paddingBottom: 15,
  },
  FooterText: {
    _el: Text,
    _textType: 'bodyLight',
  },
});
