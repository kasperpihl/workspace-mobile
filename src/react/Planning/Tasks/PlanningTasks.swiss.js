import { styleSheet } from 'swiss-react';

export default styleSheet('PlanningTasks', {
  Wrapper: {
    _flex: ['column', 'flex-start'],
    _size: ['100%', '100%'],
    flex: 1,
  },
  PlanningListWrapper: {
    flex: 1,
    width: '100%',
  },
  LoaderContainer: {
    _flex: 'center',
    _size: ['100%', '100%'],
  },
  TasksWrapper: {
    _flex: ['column', 'flex-start'],
  },
});
