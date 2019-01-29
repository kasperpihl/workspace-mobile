import { Navigation } from 'react-native-navigation';
import configureStore from 'src/redux/configureStore';
import HOCRootWrapper from 'src/react/HOCRootWrapper';
import SignIn from 'src/react/SignIn/SignIn';
import SignUpStepOne from 'src/react/SignUp/SignUpStepOne';
import SignUpStepTwo from 'src/react/SignUp/SignUpStepTwo';
// import Plan from 'src/Plan';
import ProjectList from 'src/react/Project/List/ProjectList';
import Profile from 'src/react/Profile/Profile';
import ProjectAdd from 'src/react/Project/Add/ProjectAdd';
import ProjectOverview from 'src/react/Project/Overview/ProjectOverview';
import Chat from 'src/Chat';
import getGlobals from 'src/utils/getGlobals';
import { setStore } from 'swipes-core-js/utils/store/storeGet';
import Socket from 'swipes-core-js/classes/socket';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';

// Init core!
const { store, persistor } = configureStore({
  global: getGlobals(),
});

setStore(store); // Make store accessible from core
window.socket = new Socket(store);
// END Init core

export function registerScreens() {
  Navigation.registerComponent('SignIn', () =>
    HOCRootWrapper(SignIn, store, persistor, false)
  );
  Navigation.registerComponent('SignUp', () =>
    HOCRootWrapper(SignUp, store, persistor, false)
  );
  Navigation.registerComponent('SignUpStepOne', () =>
    HOCRootWrapper(SignUpStepOne, store, persistor, false)
  );
  Navigation.registerComponent('SignUpStepTwo', () =>
    HOCRootWrapper(SignUpStepTwo, store, persistor, false)
  );
  Navigation.registerComponent(
    'ForgottenPassword',
    () => require('./react/ForgottenPassword/ForgottenPassword').default
  );
  Navigation.registerComponent('ProjectList', () =>
    HOCRootWrapper(ProjectList, store, persistor, true)
  );
  Navigation.registerComponent('Profile', () =>
    HOCRootWrapper(Profile, store, persistor, true)
  );
  Navigation.registerComponent('ProjectAdd', () =>
    HOCRootWrapper(ProjectAdd, store, persistor, true)
  );
  Navigation.registerComponent('ProjectOverview', () =>
    HOCRootWrapper(ProjectOverview, store, persistor, true)
  );
  // Navigation.registerComponent('Plan', () =>
  //   HOCRootWrapper(Plan, store, persistor, true)
  // );
  Navigation.registerComponent('Chat', () =>
    HOCRootWrapper(Chat, store, persistor, true)
  );

  // That's not a screen per say but a custom button component
  // It is needed so we have svg icons in the topBar
  Navigation.registerComponent(
    'IconTouchableWrapper',
    () => IconTouchableWrapper
  );
}
