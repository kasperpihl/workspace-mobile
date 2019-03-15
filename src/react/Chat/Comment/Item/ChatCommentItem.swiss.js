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
    _size: ['44', 'auto'],
    _flex: ['row'],
    paddingRight: '10',
  },
  Right: {
    _size: ['90%', 'auto'],
    _flex: ['column'],
  },
  Name: {
    _el: Text,
    fontSize: '12',
    color: '$sw1',
    fontWeight: 'bold',
  },
  Time: {
    _el: Text,
    fontSize: '10',
    color: '$sw2',
    marginLeft: '5',
    alignSelf: 'flex-end',
  },
  GifhyWrapper: {
    paddingTop: '4',
  },
  Message: {
    _el: Text,
    paddingTop: '4',
  },
  HeartCount: {
    _el: Text,
    fontSize: '10',
    color: '$sw2',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: '2',
    left: 65,
  },
});
