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
                backButton: {
                  visible: false,
                },
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
          visible: false,
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
          visible: false,
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
