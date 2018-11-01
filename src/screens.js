import { Navigation } from 'react-native-navigation';
import configureStore from 'src/redux/configureStore';
import HOCRootWrapper from 'src/react/HOCRootWrapper';
import Init from 'src/Init';
import SignIn from 'src/react/SignIn/SignIn';
import SignUp from 'src/react/SignUp/SignUp';
import getGlobals from 'src/utils/getGlobals';
import { init } from 'swipes-core-js';

const { store } = configureStore({
  globals: getGlobals(),
});
init(store);

export function registerScreens() {
  Navigation.registerComponent('Init', () => HOCRootWrapper(Init, store));
  Navigation.registerComponent('SignIn', () => HOCRootWrapper(SignIn, store));
  Navigation.registerComponent('SignUp', () => HOCRootWrapper(SignUp, store));
  Navigation.registerComponent(
    'ForgottenPassword',
    () => require('./react/ForgottenPassword/ForgottenPassword').default
  );
  Navigation.registerComponent('Organise', () => require('./Organise').default);
  Navigation.registerComponent('Plan', () => require('./Plan').default);
  Navigation.registerComponent('Discuss', () => require('./Discuss').default);
}
