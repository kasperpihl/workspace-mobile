import { Navigation } from 'react-native-navigation';

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    id: 'ProjectList',
                    name: 'ProjectList',
                  },
                },
                {
                  component: {
                    id: 'ProjectOverview',
                    name: 'ProjectOverview',
                    options: {
                      topBar: {
                        backButton: {
                          title: 'Organize',
                        },
                        rightButtons: [
                          {
                            id: 'Edit',
                            text: 'Edit',
                          },
                          {
                            id: 'Discuss',
                            text: 'Discuss',
                          },
                        ],
                      },
                      bottomTabs: {
                        visible: false,
                        drawBehind: true,
                        animate: true,
                      },
                    },
                  },
                },
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Organize',
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
                },
              },
            },
          },
          {
            component: {
              name: 'Plan',
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Plan',
                  icon: require('../assets/pngs/main_tab.png'),
                  selectedIcon: require('../assets/pngs/main_tab_active.png'),
                  selectedTextColor: 'blue',
                },
              },
            },
          },
          {
            component: {
              name: 'Discuss',
              options: {
                bottomTab: {
                  text: 'Discuss',
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
      component: {
        name: 'SignUp',
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
