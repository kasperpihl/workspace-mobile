import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fromJS } from 'immutable';

const { width, height } = Dimensions.get('window');

export default function getGlobals() {
  let apiUrl = 'https://workspace.swipesapp.com';

  if (
    window.__DEV__ ||
    DeviceInfo.getBundleId() === 'com.swipesapp.iosstaging' ||
    DeviceInfo.getBundleId() === 'com.swipesapp.androidstaging'
  ) {
    if (Platform.OS === 'ios') {
      apiUrl = 'http://localhost:5000';
    } else {
      apiUrl = 'http://10.0.2.2:5000';
    }
  }
  const pre = `sw-${Platform.OS}`;

  return fromJS({
    viewSize: { width, height },
    apiUrl,
    isDev: window.__DEV__,
    version: DeviceInfo.getReadableVersion(),
    withoutNotes: true,
    platform: Platform.OS,
    apiHeaders: {
      'sw-platform': Platform.OS,
      [`${pre}-version`]: DeviceInfo.getVersion(),
      [`${pre}-build-number`]: DeviceInfo.getBuildNumber(),
    },
  });
}
