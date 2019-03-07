import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ChatCommentItem', {
  Wrapper: {
    _flex: ['row'],
    _size: ['100%', 'auto'],
    _padding: [10, 20],
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
  NameTimeRow: {
    _flex: ['row'],
    _size: ['100%', 'auto'],
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
  Message: {
    _el: Text,
    paddingTop: '4',
  },
});
