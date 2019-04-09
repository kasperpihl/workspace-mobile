import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('FormLabel', {
  Wrapper: {
    _flex: ['row', 'flex-start'],
    _size: ['100%', 'auto'],
  },
  Label: {
    _el: Text,
    _textType: 'labelLight',
  },
});
