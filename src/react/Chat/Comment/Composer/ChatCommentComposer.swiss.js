import { styleSheet } from 'swiss-react';
import { TextInput, Text } from 'react-native';

export default styleSheet('ChatCommentComposer', {
  Wrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 'auto'],
    _border: [1, '$sw4', 'top'],
    _padding: 10,
  },
  InputWrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _borderRadius: 20,
    _border: [1, '$sw3'],
    flex: 1,
  },
  Input: {
    _el: TextInput,
    _textType: 'bodyDark',
    placeholderTextColor: 'sw3',
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
    width: '100%',
    maxHeight: 100,
    marginLeft: 12,
  },
  SendIconWrapper: {
    alignSelf: 'flex-end',
  },
  LoaderContainer: {
    _flex: 'center',
    _size: [44, 44],
  },
  AttachIconWrapper: {
    _size: 44,
  },
  AttachmentCounterWrapper: {
    _size: [16, 16],
    _borderRadius: 8,
    _flex: 'center',
    _textType: 'bodyWhite',
    zIndex: 1,
    top: 4,
    right: 6,
    position: 'absolute',
    backgroundColor: '$green',
  },
  AttachmentCounter: {
    _el: Text,
    fontSize: 12,
    color: '$base',
  },
});
