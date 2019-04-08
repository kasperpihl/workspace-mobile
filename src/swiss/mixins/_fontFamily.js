import { Platform } from 'react-native';
import { addMixin } from 'swiss-react';

addMixin('fontFamily', function fontFamily(styleType) {
  if (Platform.OS === 'ios') {
    let fontWeight;

    switch (styleType) {
      case 'regular':
        fontWeight = 'normal';
        break;
      case 'medium':
        fontWeight = '500';
        break;
      case 'bold':
        fontWeight = 'bold';
        break;
      default:
        fontWeight = 'normal';
    }

    return {
      fontWeight,
      fontFamily: 'SF Pro Display',
    };
  }

  if (Platform.OS === 'android') {
    const style = styleType
      ? styleType.charAt(0).toUpperCase() + styleType.slice(1)
      : 'Regular';

    return {
      fontFamily: `SF Pro Display ${style}`,
    };
  }
});
