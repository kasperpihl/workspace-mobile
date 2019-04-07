import React, { useState } from 'react';
import { Text, Switch } from 'react-native';
import SW from './PlanningTasksHeader.swiss';

export default (PlanningTaksHeader = ({ count, dispatchFilter }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [showOnlyMe, setShowOnlyMe] = useState(false);

  return (
    <SW.Wrapper>
      <Text>{`${count.totalCompletedTasks}/${count.totalTasks}`}</Text>
      <Switch
        value={showCompleted}
        onValueChange={() => {
          setShowCompleted(!showCompleted);
          dispatchFilter({
            type: 'update',
            payload: {
              showCompleted: !showCompleted,
            },
          });
        }}
      />
      <Switch
        value={showOnlyMe}
        onValueChange={() => {
          setShowOnlyMe(!showOnlyMe);
          dispatchFilter({
            type: 'update',
            payload: {
              showOnlyMe: !showOnlyMe,
            },
          });
        }}
      />
    </SW.Wrapper>
  );
});
