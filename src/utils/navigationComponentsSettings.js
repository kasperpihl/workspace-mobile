const AttachmentViewer = {
  name: 'AttachmentViewer',
  options: {
    topBar: {
      leftButtons: [
        {
          id: 'Close',
          text: 'Close',
        },
      ],
    },
    animations: {
      showModal: {
        enabled: false,
      },
    },
  },
};

const AttachmentsNoteViewer = {
  name: 'AttachmentsNoteViewer',
  options: {
    topBar: {
      leftButtons: [
        {
          id: 'Close',
          text: 'Close',
        },
      ],
    },
    animations: {
      showModal: {
        enabled: false,
      },
    },
  },
};

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
  AttachmentViewer,
  AttachmentViewerStack: {
    stack: {
      children: [],
    },
  },
  AttachmentsNoteViewer,
  AttachmentsNoteViewerStack: {
    stack: {
      children: [],
    },
  },
  PlanningOverview: {
    id: 'PlanningOverview',
    name: 'PlanningOverview',
  },
};
