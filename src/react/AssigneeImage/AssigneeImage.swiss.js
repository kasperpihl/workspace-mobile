import { styleSheet } from 'swiss-react';
import { Text, Image } from 'react-native';

export default styleSheet('AssigneeImage', {
  Image: {
    _el: Image,
    _size: get => get('size'),
    borderRadius: get => get('size') / 2,
  },
  InitialWrapper: {
    _size: get => get('size'),
    backgroundColor: '$sw3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: get => get('size') / 2,
  },
  Initial: {
    _el: Text,
    fontSize: 10,
    color: '$sw1',
    fontWeight: 'bold',
    'size>=30': {
      fontSize: 14,
    },
  },
});
