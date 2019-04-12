import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectToolbar', {
  ToolbarWrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', '40'],
    _border: [1, '$sw4', 'top'],
    backgroundColor: 'base',
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
    _textType: 'bodyBold',
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
