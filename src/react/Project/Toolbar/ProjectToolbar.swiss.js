import { styleSheet } from 'swiss-react';

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
  },
  RightButton: {
    marginLeft: 'auto',
  },
  MyKeyboard: {
    _size: ['100%', '100%'],
    backgroundColor: 'yellow',
  },
});
