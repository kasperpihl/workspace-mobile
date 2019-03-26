import { styleSheet } from 'swiss-react';
import { TextInput, Text } from 'react-native';

export default styleSheet('ChatCommentComposer', {
  Wrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _size: ['100%', 'auto'],
    _border: [2, '$sw4', 'top'],
    _padding: 10,
  },
  InputWrapper: {
    _flex: ['row', 'flex-start', 'center'],
    _borderRadius: 20,
    _border: [1, '$sw3'],
    flex: 1,
    minHeight: 30,
  },
  Input: {
    _el: TextInput,
    _padding: 10,
    flex: 1,
    marginTop: 5,
    width: '100%',
    maxHeight: 100,
  },
  SendIconWrapper: {
    alignSelf: 'flex-end',
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['44', '44'],
  },
  AttachIconWrapper: {
    _size: 44,
  },
  AttachmentCounterWrapper: {
    _size: ['16', '16'],
    _borderRadius: 8,
    _flex: 'center',
    zIndex: 1,
    top: 4,
    right: 6,
    position: 'absolute',
    backgroundColor: '$blue',
    color: '$sw5',
  },
  AttachmentCounter: {
    _el: Text,
    fontSize: 12,
    color: '$sw5',
  },
});
