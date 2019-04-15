import { Text } from 'react-native';
import { styleSheet } from 'swiss-react';

export default styleSheet('PlanningTasksHeader', {
  Wrapper: {
    _flex: ['row', 'flex-start'],
    marginTop: 13,
    marginBottom: 10,
  },
  ProgressWrapper: {
    _flex: ['column', 'flex-start'],
    _border: [1, '$sw4', 'right'],
    paddingRight: 12,
    flex: 1,
  },
  FilterWrapper: {
    _flex: ['column', 'flex-start', 'space-between'],
    paddingLeft: 12,
    paddingRight: 20,
    width: 120,
  },
  SwitchWrapper: {
    _flex: ['row', 'space-between', 'center'],
    width: '100%',
  },
  WeekLabel: {
    _el: Text,
    _textType: 'header2',
  },
  TeamLabel: {
    _el: Text,
    _textType: 'bodyDark',
  },
  CompletedLabel: {
    _el: Text,
    _textType: 'bodyLight',
    marginTop: 6,
    marginBottom: 2,
  },
  IncompleteIconWrapper: {
    _flex: 'center',
    width: 21,
    height: 21,
  },
});
