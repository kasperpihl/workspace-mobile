import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('InitLoading', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
  TextContainer: {
    _flex: ['column', 'center', 'center'],
    _size: ['100%', '100%'],
  },
  Title: {
    _el: Text,
    _textType: 'header1',
  },
  Subtitle: {
    _el: Text,
    _textType: 'bodyLight',
    _padding: [20, 0],
    maxWidth: 250,
    textAlign: 'center',
  },
  ButtonWrapper: {
    _flex: 'center',
    maxWidth: 250,
  },
});
