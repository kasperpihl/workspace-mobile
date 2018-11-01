import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  console.log('fired loader stuff');
  Navigation.setRoot({
    root: {
      component: {
        name: 'SignIn',
      },
    },
  });
});
