import React, { useMemo, useReducer, useEffect } from 'react';
import { ActivityIndicator, Text, FlatList } from 'react-native';
import useRequest from 'core/react/_hooks/useRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useAppState from 'src/react/_hooks/useAppState';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import SW from './PlanningTasks.swiss';

export default function PlanningTasks({ teamId, yearWeek }) {
  const req = useRequest('planning.listTasks', {
    owned_by: teamId,
    year_week: yearWeek,
  });

  useUpdate('planning_task', planningTask => {
    if (
      planningTask.owned_by === teamId &&
      planningTask.year_week === yearWeek
    ) {
      req.merge('tasks', tasks => {
        tasks = tasks.filter(
          ({ project_id, task_id }) =>
            !(
              planningTask.task_id === task_id &&
              planningTask.project_id === project_id
            )
        );
        if (!planningTask.deleted) {
          tasks.push(planningTask);
        }
        return tasks;
      });
    }
  });

  if (req.error || req.loading) {
    return (
      <SW.Wrapper>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
    );
  }

  if (!req.result.tasks.length) {
    // T_TODO empty state here
  }

  const tasks = req.result.tasks;

  return (
    <SW.Wrapper>
      <PlanningList tasks={tasks} />
    </SW.Wrapper>
  );
}

const PlanningList = ({ tasks }) => {
  const uniqueProjectIds = useMemo(
    () => [...new Set(tasks.map(({ project_id }) => project_id))],
    [tasks]
  );

  const [projects, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'remove': {
        return { ...state, [action.projectId]: 'removed' };
      }
      case 'update':
        return { ...state, [action.projectId]: action.payload };
      default:
        return state;
    }
  }, {});

  const sortedProjectIds = useMemo(() => {
    return uniqueProjectIds
      .filter(id => projects[id] !== 'removed')
      .sort((a, b) => {
        const aP = projects[a];
        const bP = projects[b];
        if (!aP && !bP) return 0;
        if (aP && !bP) return -1;
        if (!aP && bP) return 1;
        return aP.title.localeCompare(bP.title);
      });
  }, [uniqueProjectIds, projects]);

  return (
    <SW.PlanningListWrapper>
      <FlatList
        data={sortedProjectIds || []}
        keyExtractor={project_id => {
          return project_id;
        }}
        renderItem={({ item }) => (
          <PlanningListProject
            tasks={tasks}
            projectId={item}
            dispatch={dispatch}
          />
        )}
      />
    </SW.PlanningListWrapper>
  );
};

const PlanningListProject = ({ projectId, dispatch, tasks }) => {
  const filteredTaskIds = useMemo(
    () =>
      tasks
        .filter(({ project_id }) => project_id === projectId)
        .map(({ task_id }) => task_id),
    [tasks]
  );

  const stateManager = useSyncedProject(
    projectId,
    {
      filteredTaskIds,
    },
    (err, res) => {
      if (err && err === 'Not found') {
        dispatch({
          type: 'remove',
          projectId,
        });
      }
    }
  );

  useEffect(() => {
    if (stateManager) {
      stateManager.filterHandler.setFilteredTaskIds(filteredTaskIds);
    }
  }, [filteredTaskIds, stateManager]);

  const [visibleOrder, completion, maxIndention, title] = useProjectSlice(
    stateManager,
    (clientState, localState) => [
      localState.get('visibleOrder'),
      clientState.get('completion'),
      localState.get('maxIndention'),
      clientState.get('title'),
    ]
  );

  useAppState(() => {
    stateManager && stateManager.syncHandler.syncIfNeeded();
  });

  useEffect(() => {
    if (completion) {
      const projectState = {
        title,
        stateManager,
        maxIndention,
        numberOfCompleted: 0,
        numberOfTasks: 0,
      };
      filteredTaskIds.forEach(taskId => {
        const [
          completed,
          total,
        ] = stateManager.queryHandler.getCompletedAndTotal(taskId);
        projectState.numberOfCompleted += completed;
        projectState.numberOfTasks += total;
      });
      dispatch({
        type: 'update',
        projectId,
        payload: projectState,
      });
    }
  }, [completion, filteredTaskIds, maxIndention]);

  if (!visibleOrder || !stateManager || !visibleOrder.size) {
    return null;
  }

  return (
    <SW.TasksWrapper>
      <Text>{title}</Text>
      <ProjectProvider stateManager={stateManager}>
        {visibleOrder.map(task_id => (
          <ProjectTask taskId={task_id} key={task_id} disabled={true} />
        ))}
      </ProjectProvider>
    </SW.TasksWrapper>
  );
};
