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
  });

  Navigation.setRoot({
    root: {
      component: {
        name: 'SignIn',
      },
    },
  });
});
