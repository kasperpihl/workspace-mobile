import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';

export default styleSheet('ProjectOverview', {
  Wrapper: {
    _size: ['100%', 'auto'],
    flex: 1,
  },
  HeaderText: {
    _el: Text,
    _padding: [0, 20],
    _textType: 'header1',
  },
  GreyBorder: {
    _size: ['100%', 1],
    marginTop: 14,
    backgroundColor: '$sw4',
  },
  LoaderContainer: {
    _flex: 'center',
    flex: 1,
  },
  ListHeaderWrapper: {
    _padding: [17, 20],
  },
  CompletedLabel: {
    _el: Text,
    _textType: 'captionLight',
    marginBottom: 2,
  },
  LoadingAttachmentWrapper: {
    _flex: ['column', 'center', 'center'],
    _size: ['100%', '100%'],
    backgroundColor: '$base',
  },
  LoadingAttachmentText: {
    _el: Text,
    _textType: 'bodyDark',
  },
});
