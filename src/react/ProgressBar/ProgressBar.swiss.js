import { styleSheet } from 'swiss-react';

export default styleSheet('ProgressBar', {
  Wrapper: {
    _size: ['100%', 6],
    overflow: 'hidden',
    borderRadius: 3,
  },

  BackgroundLayer: {
    _size: '100%',
    backgroundColor: '$green2',
    opacity: 0.5,
  },

  Bar: {
    width: get => `${get('progress')}%`,
    height: '100%',
    backgroundColor: '$green',
    borderRadius: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    transition: '0.25s ease',
  },
});
