import { Text } from 'react-native';
import { styleSheet } from 'swiss-react';

export default styleSheet('PlanningTasks', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    flex: 1,
  },
  HeaderWrapper: {
    paddingLeft: 20,
  },
  PlanningListWrapper: {
    flex: 1,
    width: '100%',
    opacity: 0,
    transition: '0.25s',
    didLoad: {
      opacity: 1,
    },
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
  TasksWrapper: {
    _flex: ['column', 'flex-start'],
    paddingLeft: 8,
  },
  ProjectTitle: {
    _el: Text,
    _textType: 'captionLight',
    marginTop: 20,
    marginBottom: 12,
    paddingLeft: 10,
  },
});
