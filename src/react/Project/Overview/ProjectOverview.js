import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, VirtualizedList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import ProjectToolbar from 'src/react/Project/Toolbar/ProjectToolbar';
import KeyboardAssign from 'src/react/Keyboard/Assign/KeyboardAssign';
import useAppState from 'src/react/_hooks/useAppState';
import SW from './ProjectOverview.swiss';

console.disableYellowBox = true;

export default connect(state => ({
  teams: state.teams,
}))(ProjectOverview);

function ProjectOverview({ teams, projectId, projectTitle }) {
  const stateManager = useSyncedProject(projectId);
  const [selectedId, visibleOrder, ownedBy, tasksById] = useProjectSlice(
    stateManager,
    (clientState, localState) => [
      localState.get('selectedId'),
      localState.get('visibleOrder'),
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

  useAppState(() => {
    stateManager && stateManager.syncHandler.syncIfNeeded();
  });

  const backButton = {
    id: 'Back',
    component: {
      name: 'TopBarTouchableWrapper',
      passProps: {
        title: 'Projects',
        textType: 'captionDark',
        onPress: () => {
          Navigation.pop('ProjectOverview');
        },
      },
    },
  };

  useEffect(() => {
    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        title: backButton,
      },
    });
  }, []);

  if (!visibleOrder) {
    return (
      <SW.Wrapper>
        <SW.HeaderText numberOfLines={1}>{projectTitle}</SW.HeaderText>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
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
        <SW.HeaderText numberOfLines={1}>{projectTitle}</SW.HeaderText>
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
              icon: 'Indent_In',
              fill: 'blue',
              onPress: onItemIndent,
            },
            {
              icon: 'Indent_Out',
              fill: 'blue',
              onPress: onItemOutdent,
            },
            {
              icon: 'Members',
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
