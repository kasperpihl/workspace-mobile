export default {
  Organize: {
    id: 'Organize',
    name: 'Organize',
  },
  Profile: {
    id: 'Profile',
    name: 'Profile',
    options: {
      topBar: {
        rightButtons: [
          {
            id: 'Edit',
            text: 'Edit',
          },
        ],
      },
    },
  },
  ProjectAdd: {
    stack: {
      children: [
        {
          component: {
            id: 'ProjectAdd',
            name: 'ProjectAdd',
            options: {
              topBar: {
                rightButtons: [
                  {
                    id: 'Cancel',
                    text: 'Cancel',
                  },
                ],
              },
              animations: {
                showModal: {
                  enabled: false,
                },
              },
            },
          },
        },
      ],
    },
  },
  ProjectOverview: {
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
};
