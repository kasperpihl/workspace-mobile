import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { Slider, ActivityIndicator } from 'react-native';
import { VirtualizedList } from 'react-native';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import SW from './ProjectOverview.swiss';
import ProjectToolbar from 'src/react/Project/Toolbar/ProjectToolbar';
import KeyboardAssign from 'src/react/Keyboard/Assign/KeyboardAssign';

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
  organizations: state.organizations,
}))(ProjectOverview);

function ProjectOverview({ organizations, projectId }) {
  const stateManager = useSyncedProject(projectId);
  const [selectedId, visibleOrder, projectName, ownedBy] = useProjectSlice(
    stateManager,
    (clientState, localState) => [
      localState.get('selectedId'),
      localState.get('visibleOrder'),
      clientState.get('name'),
      clientState.get('owned_by'),
    ]
  );
  const orgUsers = organizations.getIn([ownedBy, 'users']);

  const lastSelectedId = useRef();
  useEffect(() => {
    lastSelectedId.current = selectedId;
  });

  useEffect(() => {
    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        rightButtons: defaultButtons,
      },
    });
  }, []);

  // useBeforeUnload(() => {
  //   stateManager && stateManager.syncHandler.syncIfNeeded();
  // });

  if (!visibleOrder) {
    return (
      <SW.LoaderContainer>
        <ActivityIndicator size="large" color="#007AFF" />
      </SW.LoaderContainer>
    );
  }

  // const handleSliderChange = value => {
  //   const depth = parseInt(value, 10);
  //   stateManager.expandHandler.setDepth(depth);
  // };
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
                  users: orgUsers,
                  lastSelectedTask: project.getIn([
                    // T_TODO Ask Kasper about that
                    'tasks_by_id',
                    lastSelectedId.current,
                  ]),
                };
              },
            },
          ]}
        >
          {/* <SW.SliderWrapper>
            <Slider
              minimumValue={0}
              maximumValue={4}
              onValueChange={this.handleSliderChange}
              value={0}
            />
          </SW.SliderWrapper> */}
        </ProjectToolbar>
      </SW.Wrapper>
    </ProjectProvider>
  );
}
