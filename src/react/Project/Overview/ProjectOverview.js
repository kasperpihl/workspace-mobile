import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  VirtualizedList,
  Platform,
  DatePickerAndroid,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import moment from 'moment';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import ProjectToolbar from 'src/react/Project/Toolbar/ProjectToolbar';
import KeyboardAssign from 'src/react/Keyboard/Assign/KeyboardAssign';
import KeyboardDate from 'src/react/Keyboard/Date/KeyboardDate';
import useAppState from 'src/react/_hooks/useAppState';
import ProgressBar from 'src/react/ProgressBar/ProgressBar';
import SW from './ProjectOverview.swiss';

console.disableYellowBox = true;

export default connect(state => ({
  teams: state.teams,
}))(ProjectOverview);

function ProjectOverview({ teams, projectId, projectTitle }) {
  const [loadingAttachment, setLoadingAttachment] = useState(false);
  const stateManager = useSyncedProject(projectId);
  const [
    selectedId,
    visibleOrder,
    ownedBy,
    tasksById,
    numberOfCompleted,
    numberOfLeafs,
  ] = useProjectSlice(stateManager, (clientState, localState) => [
    localState.get('selectedId'),
    localState.get('visibleOrder'),
    clientState.get('owned_by'),
    clientState.get('tasks_by_id'),
    localState.get('numberOfCompleted'),
    localState.get('numberOfLeafs'),
  ]);
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
      name: 'TextButton',
      alignment: 'fill',
      passProps: {
        backButton: true,
        icon: 'ArrowLeft',
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
        <SW.GreyBorder />
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
  const onAttach = (type, id, title) => {
    stateManager.editHandler.attach(lastSelectedId.current, {
      type,
      id,
      title,
    });

    if (loadingAttachment) {
      setLoadingAttachment(false);
    }
  };
  const getItemCount = data => data.size;
  const getItem = (data, index) => ({
    key: data.get(index),
    taskId: data.get(index),
  });
  const renderItem = ({ item }) => <ProjectTask taskId={item.taskId} />;
  const openAndroidDatePicker = async () => {
    const dueDate = tasksById.get(selectedId).get('due_date');
    const initDate = dueDate ? new Date(moment(dueDate)) : new Date();

    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: initDate,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const dueDate = moment([year, month, day]).format('YYYY-MM-DD');
        stateManager.editHandler.updateDueDate(selectedId, dueDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', code, message);
    }
  };
  const createToolbarButtons = () => {
    const buttons = [
      {
        icon: 'IndentIn',
        fill: 'dark',
        onPress: onItemIndent,
      },
      {
        icon: 'IndentOut',
        fill: 'dark',
        onPress: onItemOutdent,
      },
      {
        icon: 'Member',
        fill: 'dark',
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
      {
        icon: 'Attach',
        fill: 'dark',
        onPress: onAttach,
      },
    ];

    if (Platform.OS === 'ios') {
      buttons.push({
        icon: 'Calendar',
        fill: 'dark',
        textButtonLabel:
          tasksById && selectedId
            ? tasksById.get(selectedId).get('due_date')
              ? moment(tasksById.get(selectedId).get('due_date')).format(
                  'DD MMM `YY'
                )
              : null
            : null,
        keyboard: KeyboardDate,
        customKeyboardTitle: 'Pick a date',
        getKeyboardProps: () => {
          return {
            stateManager: stateManager,
            lastSelectedTask: tasksById.get(lastSelectedId.current),
          };
        },
      });
    }

    if (Platform.OS === 'android') {
      buttons.push({
        icon: 'Calendar',
        fill: 'dark',
        textButtonLabel:
          tasksById && selectedId
            ? tasksById.get(selectedId).get('due_date')
              ? moment(tasksById.get(selectedId).get('due_date')).format(
                  'DD MMM `YY'
                )
              : null
            : null,
        onPress: openAndroidDatePicker,
      });
    }

    return buttons;
  };

  return (
    <ProjectProvider stateManager={stateManager}>
      <SW.Wrapper>
        <SW.HeaderText numberOfLines={1}>{projectTitle}</SW.HeaderText>
        <SW.GreyBorder />
        {loadingAttachment && (
          <SW.LoadingAttachmentWrapper>
            <ActivityIndicator size="large" color="#007AFF" />
            <SW.LoadingAttachmentText>
              Uploading attachment
            </SW.LoadingAttachmentText>
          </SW.LoadingAttachmentWrapper>
        )}
        <VirtualizedList
          ListHeaderComponent={
            <SW.ListHeaderWrapper>
              <SW.CompletedLabel>
                {`${numberOfCompleted}/${numberOfLeafs} TASKS COMPLETED`}
              </SW.CompletedLabel>
              <ProgressBar
                progress={Math.ceil((numberOfCompleted / numberOfLeafs) * 100)}
              />
            </SW.ListHeaderWrapper>
          }
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
          setLoadingAttachment={setLoadingAttachment}
          ownedBy={ownedBy}
          buttons={createToolbarButtons()}
        />
      </SW.Wrapper>
    </ProjectProvider>
  );
}
