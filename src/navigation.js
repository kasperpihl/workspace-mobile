import { Navigation } from 'react-native-navigation'

export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'Organise',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Organise',
                icon: require('../assets/test.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Plan',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Plan',
                icon: require('../assets/test.png')
              }
            }
          },
        },
        {
          component: {
            name: 'Discuss',
            options: {
              bottomTab: {
                text: 'Discuss',
                fontSize: 12,
                icon: require('../assets/test.png')
              }
            }
          },
        },
      ],
    }
  }
});