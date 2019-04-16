import React, { useState } from 'react';
import { Switch } from 'react-native';
import ProgressBar from 'src/react/ProgressBar/ProgressBar';
import parseWeekLabel from 'core/utils/time/parseWeekLabel';
import teamGetBelonging from 'core/utils/team/teamGetBelonging';
import useMyId from 'core/react/_hooks/useMyId';
import Icon from 'src/react/Icon/Icon';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import SW from './PlanningTasksHeader.swiss';

export default (PlanningTasksHeader = ({
  count,
  dispatchFilter,
  yearWeek,
  teamId,
  setToggleInfo,
}) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [showOnlyMe, setShowOnlyMe] = useState(false);
  const myId = useMyId();

  return (
    <SW.Wrapper>
      <SW.ProgressWrapper
        onPress={() => {
          setToggleInfo(true);
        }}
      >
        <SW.WeekLabel>{parseWeekLabel(yearWeek)}</SW.WeekLabel>
        <SW.TeamLabel>{teamGetBelonging(teamId)}</SW.TeamLabel>
        <SW.CompletedLabel>
          {`${count.totalCompletedTasks}/${count.totalTasks} tasks completed`}
        </SW.CompletedLabel>
        <ProgressBar
          progress={Math.ceil(
            (count.totalCompletedTasks / count.totalTasks) * 100
          )}
        />
      </SW.ProgressWrapper>
      <SW.FilterWrapper>
        <SW.SwitchWrapper>
          <SW.IncompleteIconWrapper>
            <Icon name="Incomplete" fill="dark" />
          </SW.IncompleteIconWrapper>
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
        </SW.SwitchWrapper>
        <SW.SwitchWrapper>
          <AssigneeImage
            userId={myId}
            teamId={teamId}
            size={21}
            imageSize={64}
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
        </SW.SwitchWrapper>
      </SW.FilterWrapper>
    </SW.Wrapper>
  );
});
