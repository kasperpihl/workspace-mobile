import { Navigation } from 'react-native-navigation';
import configureStore from 'src/redux/configureStore';
import HOCRootWrapper from 'src/react/HOCRootWrapper';
import SignIn from 'src/react/SignIn/SignIn';
import SignUp from 'src/react/SignUp/SignUp';
import Plan from 'src/Plan';
import Organize from 'src/react/Organize/Organize';
import ProjectOverview from 'src/react/Project/Overview/ProjectOverview';
import Discuss from 'src/Discuss';
import getGlobals from 'src/utils/getGlobals';
import { setStore } from 'swipes-core-js/utils/store/storeGet';
import Socket from 'swipes-core-js/classes/Socket';

// Init core!
const { store, persistor } = configureStore({
  global: getGlobals(),
});

setStore(store); // Make store accessible from core
window.socket = new Socket(store);
// END Init core

// setTimeout(() => {
//   store.dispatch({ type: 'RESET_STATE' });
// }, 1000);

export function registerScreens() {
  Navigation.registerComponent('SignIn', () =>
    HOCRootWrapper(SignIn, store, persistor, false)
  );
  Navigation.registerComponent('SignUp', () =>
    HOCRootWrapper(SignUp, store, persistor, false)
  );
  Navigation.registerComponent(
    'ForgottenPassword',
    () => require('./react/ForgottenPassword/ForgottenPassword').default
  );
  Navigation.registerComponent('Organize', () =>
    HOCRootWrapper(Organize, store, persistor, true)
  );
  Navigation.registerComponent('ProjectOverview', () =>
    HOCRootWrapper(ProjectOverview, store, persistor, true)
  );
  Navigation.registerComponent('Plan', () =>
    HOCRootWrapper(Plan, store, persistor, true)
  );
  Navigation.registerComponent('Discuss', () =>
    HOCRootWrapper(Discuss, store, persistor, true)
  );
}
