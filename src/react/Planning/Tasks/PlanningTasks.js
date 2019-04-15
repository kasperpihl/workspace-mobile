import React, { useMemo, useReducer, useEffect, useRef } from 'react';
import { ActivityIndicator, Text, FlatList } from 'react-native';
import useRequest from 'core/react/_hooks/useRequest';
import useUpdate from 'core/react/_hooks/useUpdate';
import useSyncedProject from 'core/react/_hooks/useSyncedProject';
import useProjectSlice from 'core/react/_hooks/useProjectSlice';
import ProjectProvider from 'core/react/_hocs/Project/ProjectProvider';
import useAppState from 'src/react/_hooks/useAppState';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import PlanningTasksHeader from 'src/react/Planning/Tasks/Header/PlanningTasksHeader';
import useMyId from 'core/react/_hooks/useMyId';
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
      <PlanningList tasks={tasks} teamId={teamId} yearWeek={yearWeek} />
    </SW.Wrapper>
  );
}

const PlanningList = ({ tasks, teamId, yearWeek }) => {
  const didLoadInitial = useRef();
  const uniqueProjectIds = useMemo(
    () => [...new Set(tasks.map(({ project_id }) => project_id))],
    [tasks]
  );

  const [count, dispatchCount] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'update':
          return { ...state, ...action.payload };
        default:
          return state;
      }
    },
    {
      totalTasks: 0,
      totalCompletedTasks: 0,
    }
  );

  const [filter, dispatchFilter] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'update':
          return { ...state, ...action.payload };
        default:
          return state;
      }
    },
    {
      showOnlyMe: false,
      showCompleted: false,
    }
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

  useEffect(() => {
    if (!didLoadInitial.current) {
      if (Object.keys(projects).length !== uniqueProjectIds.length) {
        return;
      }
      didLoadInitial.current = true;
    }

    let dCompleted = 0;
    let dTotal = 0;
    Object.values(projects).forEach(p => {
      if (p === 'pending') return;
      if (p === 'removed') return;
      dCompleted += p.numberOfCompleted;
      dTotal += p.numberOfTasks;
    });

    dispatchCount({
      type: 'update',
      payload: {
        totalTasks: dTotal,
        totalCompletedTasks: dCompleted,
      },
    });
  }, [projects, tasks]);

  return (
    <>
      {!didLoadInitial.current && (
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      )}
      <SW.PlanningListWrapper didLoad={didLoadInitial.current}>
        <FlatList
          data={sortedProjectIds || []}
          keyExtractor={project_id => {
            return project_id;
          }}
          ListHeaderComponent={
            <SW.HeaderWrapper>
              <PlanningTasksHeader
                count={count}
                dispatchFilter={dispatchFilter}
                yearWeek={yearWeek}
                teamId={teamId}
              />
            </SW.HeaderWrapper>
          }
          renderItem={({ item }) => (
            <PlanningListProject
              tasks={tasks}
              projectId={item}
              dispatch={dispatch}
              filter={filter}
            />
          )}
        />
      </SW.PlanningListWrapper>
    </>
  );
};

const PlanningListProject = ({ projectId, dispatch, tasks, filter }) => {
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

  const myId = useMyId();
  useEffect(() => {
    if (stateManager) {
      stateManager.filterHandler.setFilteredTaskIds(filteredTaskIds);
      stateManager.filterHandler.setFilteredCompleted(filter.showCompleted);
      stateManager.filterHandler.setFilteredAssignee(
        filter.showOnlyMe ? myId : null
      );
    }
  }, [filteredTaskIds, stateManager, filter.showCompleted, filter.showOnlyMe]);

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
      <SW.ProjectTitle>{title.toUpperCase()}</SW.ProjectTitle>
      <ProjectProvider stateManager={stateManager}>
        {visibleOrder.map(task_id => (
          <ProjectTask taskId={task_id} key={task_id} disabled={true} />
        ))}
      </ProjectProvider>
    </SW.TasksWrapper>
  );
};
