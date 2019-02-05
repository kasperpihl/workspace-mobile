import { styleSheet } from 'swiss-react';

export default styleSheet('ProgressCircle', {
  Wrapper: {
    _border: [2, '$green'],
    _borderRadius: props => props.size / 2,
    width: props => props.size,
    height: props => props.size,
  },
});
