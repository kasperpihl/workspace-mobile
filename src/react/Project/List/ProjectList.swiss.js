import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectList', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
  },
  HeaderText: {
    _el: Text,
    _textType: 'header1',
    _padding: [0, 20],
  },
  GreyBorder: {
    _size: ['100%', 1],
    marginTop: 14,
    backgroundColor: '$sw4',
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
  FlatListWrapper: {
    paddingLeft: 20,
    flex: 1,
  },
  LoaderContainerFooter: {
    _flex: 'center',
    _padding: 10,
  },
});
