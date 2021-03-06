import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';
import getGlobals from 'src/utils/getGlobals';

const globals = getGlobals();

export default styleSheet('ChatListItem', {
  Wrapper: {
    _flex: 'row',
    width: globals.getIn(['viewSize', 'width']),
  },
  LeftSide: {
    width: 40,
  },
  UnreadDot: {
    _size: [10],
    _borderRadius: 5,
    marginLeft: 15,
    marginTop: 15,
    backgroundColor: '$blue',
    opacity: 0,
    unread: {
      opacity: 1,
    },
  },
  RightSide: {
    _flex: 'column',
    _border: [1, '$sw4', 'bottom'],
    width: globals.getIn(['viewSize', 'width']) - 60,
    paddingVertical: 10,
  },
  TopicRow: {
    _flex: 'row',
    width: '100%',
  },
  TopicText: {
    flex: 2,
  },
  TopicLastCommentTime: {
    flex: 1,
  },
  LineOfText: {
    _el: Text,
    width: '100%',
    marginTop: 2,
    topic: {
      _textType: 'header2',
    },
    team: {
      _textType: 'bodyLight',
    },
    alignRight: {
      _textType: 'bodyLight',
      textAlign: 'right',
    },
  },
});
