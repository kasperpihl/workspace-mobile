import React, { PureComponent } from 'react';
import { View } from 'react-native';
import colors from 'src/utils/colors';
import SW from './ProgressCircle.swiss';

// Took a solution from this article
// https://cmichel.io/react-native-progress-circle
export default class ProgressCircle extends PureComponent {
  percentToDegrees = percent => {
    return percent * 3.6;
  };
  render() {
    const { percent, size = 22 } = this.props;
    const firstHalfCircleDegrees = this.percentToDegrees(
      percent > 50 ? 50 : percent
    );
    const secondHalfCircleDegrees = this.percentToDegrees(
      percent > 50 ? percent : 0
    );
    const bgColorSecondHalfCircle = percent > 50 ? colors.green : 'white';
    const circleWidth = Math.floor((size - 6) / 2);

    return (
      <SW.Wrapper size={size}>
        <View
          style={{
            position: 'absolute',
            top: 1,
            left: 1,
            zIndex: 1,
            width: circleWidth,
            height: circleWidth * 2,
            backgroundColor: colors.green,
            borderRadius: circleWidth,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            transform: [
              { translateX: circleWidth / 2 },
              { rotate: `${firstHalfCircleDegrees}deg` },
              { translateX: (circleWidth * -1) / 2 },
            ],
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 1,
            left: 1,
            zIndex: 2,
            width: circleWidth,
            height: circleWidth * 2,
            backgroundColor: bgColorSecondHalfCircle,
            borderRadius: circleWidth,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            transform: [
              { translateX: circleWidth / 2 },
              { rotate: `${secondHalfCircleDegrees}deg` },
              { translateX: (circleWidth * -1) / 2 },
            ],
          }}
        />
      </SW.Wrapper>
    );
  }
}
