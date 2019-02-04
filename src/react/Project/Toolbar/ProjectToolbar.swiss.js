import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectToolbar', {
  ToolbarWrapper: {
    _flex: ['row'],
    _size: ['100%', '40'],
    backgroundColor: '$sw3',
    height: props => {
      return props.show ? 40 : 0;
    },
    opacity: props => {
      return props.show ? 1 : 0;
    },
    justifyContent: props => {
      return props.customKeyboardIsShown ? 'space-between' : 'flex-start';
    },
  },
  Title: {
    _el: Text,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  RightButton: {
    marginLeft: props => {
      return props.customKeyboardIsShown ? '' : 'auto';
    },
  },
  MyKeyboard: {
    _size: ['100%', '100%'],
  },
});
