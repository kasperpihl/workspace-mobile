export default {
  ProjectList: {
    id: 'ProjectList',
    name: 'ProjectList',
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
                leftButtons: [
                  {
                    id: 'Cancel',
                    text: 'Cancel',
                  },
                ],
                rightButtons: [
                  {
                    id: 'Create',
                    text: 'Create',
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
          title: 'Projects',
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
  ChatList: {
    id: 'ChatList',
    name: 'ChatList',
  },
  ChatAdd: {
    stack: {
      children: [
        {
          component: {
            id: 'ChatAdd',
            name: 'ChatAdd',
            options: {
              topBar: {
                leftButtons: [
                  {
                    id: 'Cancel',
                    text: 'Cancel',
                  },
                ],
                rightButtons: [
                  {
                    id: 'Create',
                    text: 'Create',
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
  ChatOverview: {
    id: 'ChatOverview',
    name: 'ChatOverview',
    options: {
      topBar: {
        backButton: {
          title: 'Discussions',
        },
      },
      bottomTabs: {
        visible: false,
        drawBehind: true,
        animate: true,
      },
    },
  },
};
