import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  // Default navigation options
  Navigation.setDefaultOptions({
    topBar: {
      noBorder: true,
      elevation: 0,
    },
    bottomTabs: {
      animate: false,
      titleDisplayMode: 'alwaysShow',
    },
  });

  Navigation.setRoot({
    root: {
      component: {
        name: 'SignIn',
      },
    },
  });
});
