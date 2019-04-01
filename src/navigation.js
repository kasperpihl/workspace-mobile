import { Navigation } from 'react-native-navigation';
import navigationComponents from 'src/utils/navigationComponentsSettings';

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: navigationComponents.ChatList,
                },
                // {
                //   component: navigationComponents.ProjectOverview,
                // },
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Projects',
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'PlanningOverview',
                  },
                },
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Planning',
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: navigationComponents.ProjectList,
                },
                // {
                //   component: navigationComponents.ProjectOverview,
                // },
              ],
              options: {
                bottomTab: {
                  text: 'Chat',
                  fontSize: 12,
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
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
                  text: 'Profile',
                  fontSize: 12,
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
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
      component: {
        name: 'SignIn',
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
      component: {
        name: 'ForgottenPassword',
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
