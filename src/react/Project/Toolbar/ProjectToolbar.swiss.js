import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectToolbar', {
  ToolbarWrapper: {
    _flex: ['row'],
    _size: ['100%', '40'],
    backgroundColor: '$sw3',
    height: get => {
      return get('show') ? 40 : 0;
    },
    opacity: get => {
      return get('show') ? 1 : 0;
    },
    justifyContent: get => {
      return get('customKeyboardIsShown') ? 'space-between' : 'flex-start';
    },
  },
  Title: {
    _el: Text,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  RightButton: {
    marginLeft: get => {
      return get('customKeyboardIsShown') ? '' : 'auto';
    },
  },
  MyKeyboard: {
    _size: ['100%', '100%'],
  },
});
