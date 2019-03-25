import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { ActivityIndicator } from 'react-native';
import { VirtualizedList } from 'react-native';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import ProjectToolbar from 'src/react/Project/Toolbar/ProjectToolbar';
import KeyboardAssign from 'src/react/Keyboard/Assign/KeyboardAssign';
import useAppState from 'src/react/_hooks/useAppState';
import SW from './ProjectOverview.swiss';

console.disableYellowBox = true;

const defaultButtons = [
  {
    id: 'Edit',
    text: 'Edit',
  },
  {
    id: 'Discuss',
    text: 'Discuss',
  },
];

export default connect(state => ({
  teams: state.teams,
}))(ProjectOverview);

function ProjectOverview({ teams, projectId }) {
  const stateManager = useSyncedProject(projectId);
  const [selectedId, visibleOrder, ownedBy, tasksById] = useProjectSlice(
    stateManager,
    (clientState, localState) => [
      localState.get('selectedId'),
      localState.get('visibleOrder'),
      clientState.get('name'),
      clientState.get('owned_by'),
      clientState.get('tasks_by_id'),
    ]
  );
  const teamUsers = teams.getIn([ownedBy, 'users']);

  const lastSelectedId = useRef();
  useEffect(() => {
    if (selectedId) {
      lastSelectedId.current = selectedId;
    }
  });

  useEffect(() => {
    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        rightButtons: defaultButtons,
      },
    });
  }, []);

  useAppState(() => {
    stateManager && stateManager.syncHandler.syncIfNeeded();
  });

  if (!visibleOrder) {
    return (
      <SW.LoaderContainer>
        <ActivityIndicator size="large" color="#007AFF" />
      </SW.LoaderContainer>
    );
  }

  const onItemIndent = () => {
    stateManager.indentHandler.indent(selectedId);
  };
  const onItemOutdent = () => {
    stateManager.indentHandler.outdent(selectedId);
  };
  const getItemCount = data => data.size;
  const getItem = (data, index) => ({
    key: data.get(index),
    taskId: data.get(index),
  });
  const renderItem = ({ item }) => <ProjectTask taskId={item.taskId} />;

  return (
    <ProjectProvider stateManager={stateManager}>
      <SW.Wrapper>
        <VirtualizedList
          keyboardDismissMode={'none'}
          keyboardShouldPersistTaps={'always'}
          getItem={getItem}
          getItemCount={getItemCount}
          data={visibleOrder}
          renderItem={renderItem}
        />
        <ProjectToolbar
          hasFocus={!!selectedId}
          onPressDoneButton={() => {
            const selectedId = stateManager.getLocalState().get('selectedId');
            stateManager.selectHandler.deselect(selectedId);
          }}
          onPressBackButton={() => {
            stateManager.selectHandler.select(lastSelectedId.current);
          }}
          buttons={[
            {
              icon: 'indent_in',
              fill: 'blue',
              onPress: onItemIndent,
            },
            {
              icon: 'indent_out',
              fill: 'blue',
              onPress: onItemOutdent,
            },
            {
              icon: 'members',
              fill: 'blue',
              keyboard: KeyboardAssign,
              customKeyboardTitle: 'Assignees',
              getKeyboardProps: () => {
                return {
                  stateManager: stateManager,
                  users: teamUsers,
                  lastSelectedTask: tasksById.get(lastSelectedId.current),
                };
              },
            },
          ]}
        />
      </SW.Wrapper>
    </ProjectProvider>
  );
}
