export default {
  Organize: {
    id: 'Organize',
    name: 'Organize',
    options: {
      topBar: {
        rightButtons: [
          {
            id: 'Add',
            text: 'Add',
          },
        ],
      },
    },
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
