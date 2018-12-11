export default {
  ProjectList: {
    id: 'ProjectList',
    name: 'ProjectList',
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
