import { styleSheet } from 'swiss-react';
import { TouchableOpacity } from 'react-native';

export default styleSheet('ProjectToolbar', {
  ToolbarWrapper: {
    _flex: ['row'],
    _size: ['100%', '40'],
    backgroundColor: '$sw3',
    height: props => {
      return props.toolBarAlwaysVisible ? 40 : 0;
    },
    opacity: props => {
      return props.toolBarAlwaysVisible ? 1 : 0;
    },
  },
  WhileHiddenView: {
    _size: ['100%', '40'],
    height: props => {
      return props.toolBarAlwaysVisible ? 40 : 0;
    },
  },
  ChangeKeyboard: {
    _el: TouchableOpacity,
    _size: ['40', '40'],
    _borderRadius: '20',
    backgroundColor: '$blue',
  },
  MyKeyboard: {
    _size: ['100%', '100%'],
    backgroundColor: 'yellow',
  },
});
