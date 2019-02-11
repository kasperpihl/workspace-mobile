import { styleSheet } from 'swiss-react';

export default styleSheet('ProgressCircle', {
  Wrapper: {
    _border: [2, '$green'],
    _borderRadius: get => get('size') / 2,
    width: get => get('size'),
    height: get => get('size'),
  },
});
