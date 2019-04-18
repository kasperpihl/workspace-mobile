import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';
const iconProjects = require('../assets/pngs/Projects.png');
const iconPlanning = require('../assets/pngs/Planning.png');
const iconChat = require('../assets/pngs/Chat.png');
const iconProfile = require('../assets/pngs/Profile.png');

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: navigationComponents.ProjectList,
                },
              ],
              options: {
                bottomTab: {
                  icon: iconProjects,
                  iconColor: 'grey',
                  selectedIconColor: 'black',
                  iconInsets: { top: 7, bottom: -7 },
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: navigationComponents.PlanningOverview,
                },
              ],
              options: {
                bottomTab: {
                  icon: iconPlanning,
                  iconColor: 'grey',
                  selectedIconColor: 'black',
                  iconInsets: { top: 7, bottom: -7 },
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: navigationComponents.ChatList,
                },
              ],
              options: {
                bottomTab: {
                  icon: iconChat,
                  iconColor: 'grey',
                  selectedIconColor: 'black',
                  iconInsets: { top: 7, bottom: -7 },
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: navigationComponents.Profile,
                },
              ],
              options: {
                bottomTab: {
                  icon: iconProfile,
                  iconColor: 'grey',
                  selectedIconColor: 'black',
                  iconInsets: { top: 7, bottom: -7 },
                },
              },
            },
          },
        ],
      },
    },
  });

export const goSignIn = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'SignIn',
            },
          },
        ],
      },
    },
  });

export const goSignUp = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'SignUpStepOne',
            },
          },
        ],
      },
    },
  });

export const goForgottenPassword = () =>
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'ForgottenPassword',
            },
          },
        ],
      },
    },
  });

export const goInitLoading = () =>
  Navigation.setRoot({
    root: {
      component: {
        name: 'InitLoading',
      },
    },
  });
