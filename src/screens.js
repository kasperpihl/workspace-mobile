import React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SwissProvider } from 'swiss-react';
import configureStore from 'src/redux/configureStore';
import HOCRootWrapper from 'src/react/HOCRootWrapper';

// Screens
import SignIn from 'src/react/SignIn/SignIn';
import SignUpStepOne from 'src/react/SignUp/SignUpStepOne';
import SignUpStepTwo from 'src/react/SignUp/SignUpStepTwo';
import ProjectList from 'src/react/Project/List/ProjectList';
import Profile from 'src/react/Profile/Profile';
import ForgottenPassword from 'src/react/ForgottenPassword/ForgottenPassword';
import ProjectAdd from 'src/react/Project/Add/ProjectAdd';
import ProjectOverview from 'src/react/Project/Overview/ProjectOverview';
import ChatList from 'src/react/Chat/List/ChatList.js';
import ChatAdd from 'src/react/Chat/Add/ChatAdd.js';
import ChatOverview from 'src/react/Chat/Overview/ChatOverview';
import PlanningOverview from 'src/react/Planning/Overview/PlanningOverview';
import AttachmentViewer from 'src/react/AttachmentViewer/AttachmentViewer';
import AttachmentsNoteViewer from 'src/react/Attachments/NoteViewer/AttachmentsNoteViewer';
import getGlobals from 'src/utils/getGlobals';
import { setStore } from 'core/utils/store/storeGet';
import Socket from 'core/classes/Socket';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import TopBarTouchableWrapper from 'src/react/TopBarTouchableWrapper/TopBarTouchableWrapper';

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
  Navigation.registerComponent('ForgottenPassword', () =>
    HOCRootWrapper(ForgottenPassword, store, persistor, false)
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
  Navigation.registerComponent('ChatList', () =>
    HOCRootWrapper(ChatList, store, persistor, true)
  );
  Navigation.registerComponent('ChatAdd', () =>
    HOCRootWrapper(ChatAdd, store, persistor, true)
  );
  Navigation.registerComponent('ChatOverview', () =>
    HOCRootWrapper(ChatOverview, store, persistor, true)
  );
  Navigation.registerComponent('PlanningOverview', () =>
    HOCRootWrapper(PlanningOverview, store, persistor, true)
  );
  Navigation.registerComponent('AttachmentViewer', () =>
    HOCRootWrapper(AttachmentViewer, store, persistor, true)
  );
  Navigation.registerComponent('AttachmentsNoteViewer', () =>
    HOCRootWrapper(AttachmentsNoteViewer, store, persistor, true)
  );

  // That's not a screen per say but a custom button component
  // It is needed so we have svg icons in the topBar
  Navigation.registerComponent('IconTouchableWrapper', () => {
    return class SpecialStupidWrapper extends React.PureComponent {
      render() {
        return (
          <SwissProvider defaultEl={View}>
            <IconTouchableWrapper {...this.props} />
          </SwissProvider>
        );
      }
    };
  });

  // That's not a screen per say but a custom button component
  // It is needed so we have custom text style in the topBar
  Navigation.registerComponent('TopBarTouchableWrapper', () => {
    return class SpecialStupidWrapper extends React.PureComponent {
      render() {
        return (
          <SwissProvider defaultEl={View}>
            <TopBarTouchableWrapper {...this.props} />
          </SwissProvider>
        );
      }
    };
  });
}
