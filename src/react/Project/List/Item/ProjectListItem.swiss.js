import { styleSheet } from 'swiss-react';
import { Text } from 'react-native';
import getGlobals from 'src/utils/getGlobals';

const globals = getGlobals();

export default styleSheet('ProjectListItem', {
  Wrapper: {
    _flex: 'row',
    width: globals.getIn(['viewSize', 'width']) - 30,
  },
  LeftSide: {
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  Middle: {
    flex: 1,
    width: '100%',
    paddingVertical: 5,
    paddingRight: 10,
  },
  LineOfText: {
    _el: Text,
    _textType: 'bodyLight',
    width: '100%',
    marginTop: 2,
    topic: {
      _textType: 'header2',
    },
  },
});
