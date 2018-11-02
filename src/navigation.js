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
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Organize',
                  icon: require('../assets/test.png'),
                  selectedTextColor: 'blue',
                  selectedIconColor: 'blue',
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
                  icon: require('../assets/test.png'),
                  selectedTextColor: 'blue',
                  selectedIconColor: 'blue',
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
                  icon: require('../assets/test.png'),
                  selectedTextColor: 'blue',
                  selectedIconColor: 'blue',
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
