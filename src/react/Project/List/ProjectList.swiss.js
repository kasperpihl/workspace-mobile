import { styleSheet } from 'swiss-react';
import { Text, TouchableOpacity } from 'react-native';

export default styleSheet('ProjectList', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    _padding: [0, 20],
  },
  ToolBarWrapper: {
    _size: ['100%', '44'],
    _flex: ['row', 'flex-end'],
  },
  AddProject: {
    _el: TouchableOpacity,
    _size: ['20', '20'],
    _borderRadius: '10',
    backgroundColor: '$blue',
  },
  HeaderText: {
    _el: Text,
    fontSize: '30',
    fontWeight: 'bold',
  },
});
