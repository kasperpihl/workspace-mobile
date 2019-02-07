import { styleSheet } from 'swiss-react';
import { Text, Image } from 'react-native';

export default styleSheet('AssigneeImage', {
  Image: {
    _el: Image,
    _size: props => props.size,
    borderRadius: props => props.size / 2,
  },
  InitialWrapper: {
    _size: props => props.size,
    backgroundColor: '$sw3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: props => props.size / 2,
  },
  Initial: {
    _el: Text,
    fontSize: '10',
    color: '$sw1',
    fontWeight: 'bold',
    'size>=30': {
      fontSize: '14',
    },
  },
});
