import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatCommentItem', {
  Wrapper: {
    _flex: ['column'],
    _size: ['100%', 'auto'],
    _padding: [0, 20],
  },
  Row: {
    _flex: ['row'],
    _size: ['100%', 'auto'],
  },
  Left: {
    _size: [44, 'auto'],
    _flex: ['row'],
    paddingRight: 10,
  },
  Right: {
    _size: ['90%', 'auto'],
    _flex: ['column'],
  },
  Name: {
    _el: Text,
    _textType: 'bodyBold',
  },
  Time: {
    _el: Text,
    _textType: 'labelLight',
    marginLeft: 5,
    marginTop: -2,
    alignSelf: 'flex-end',
  },
  GifhyWrapper: {
    paddingTop: 4,
  },
  Message: {
    _el: Text,
    _textType: 'bodyDark',
    paddingTop: 4,
  },
  HeartCount: {
    _el: Text,
    _textType: 'labelLight',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 2,
    left: 66,
  },
});
