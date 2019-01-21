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
  BlueCircle: {
    _borderRadius: 11,
    width: 22,
    height: 22,
    backgroundColor: '$blue',
  },
  LineOfText: {
    _el: Text,
    fontSize: 12,
    width: '100%',
    color: '$sw2',
    marginTop: 2,
    topic: {
      fontSize: 14,
      color: '$sw1',
    },
  },
});
