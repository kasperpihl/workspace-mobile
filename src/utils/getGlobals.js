import { Platform, Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { fromJS } from 'immutable';

const { width, height } = Dimensions.get('window');

export default function getGlobals() {
  const bundleId = DeviceInfo.getBundleId();
  const isDev =
    bundleId === 'com.workspacemobile.androiddev' ||
    bundleId === 'com.workspacemobile.iosdev';

  let apiUrl = 'https://wspc.io';
  if (
    isDev
    // bundleId === 'com.workspacemobile.androidstaging' ||
    // bundleId === 'com.workspacemobile.iosstaging'
  ) {
    apiUrl = 'http://192.168.1.48:5000';
    // apiUrl = 'http://localhost:5000';
  }
  const pre = `sw-${Platform.OS}`;

  return fromJS({
    apiUrl,
    isDev,
    viewSize: { width, height },
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
