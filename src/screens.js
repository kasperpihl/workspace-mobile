import { Navigation } from 'react-native-navigation';
import configureStore from 'src/redux/configureStore';
import HOCRootWrapper from 'src/react/HOCRootWrapper';
import SignIn from 'src/react/SignIn/SignIn';
import SignUp from 'src/react/SignUp/SignUp';
import Plan from 'src/Plan';
import ProjectList from 'src/react/ProjectList/ProjectList';
import Project from 'src/react/Project/Project';
import Discuss from 'src/Discuss';
import getGlobals from 'src/utils/getGlobals';
import { init } from 'swipes-core-js';

const { store, persistor } = configureStore({
  globals: getGlobals(),
});
init(store);
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
  Navigation.registerComponent('ProjectList', () =>
    HOCRootWrapper(ProjectList, store, persistor, true)
  );
  Navigation.registerComponent('Project', () =>
    HOCRootWrapper(Project, store, persistor, true)
  );
  Navigation.registerComponent('Plan', () =>
    HOCRootWrapper(Plan, store, persistor, true)
  );
  Navigation.registerComponent('Discuss', () =>
    HOCRootWrapper(Discuss, store, persistor, true)
  );
}
