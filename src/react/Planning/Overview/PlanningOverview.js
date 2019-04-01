import React, { useState } from 'react';
import { connect } from 'react-redux';
import useRequest from 'core/react/_hooks/useRequest';
import timeGetDefaultWeekYear from 'core/utils/time/timeGetDefaultWeekYear';
import PlanningInfo from 'src/react/Planning/Info/PlanningInfo.js';
import SW from './PlanningOverview.swiss';

const PlanningOverview = ({ teams, myId }) => {
  console.log(teams.toJS());
  const [toggleInfo, setToggleInfo] = useState(true);
  const [yearWeek, setYearWeek] = useState(timeGetDefaultWeekYear());
  const [teamId, setTeamId] = useState(null);
  const onWeekChange = yW => {
    setYearWeek(yW);
  };
  const onTeamChange = teamId => {
    setTeamId(teamId);
  };

  return (
    <SW.Wrapper>
      <SW.HeaderText numberOfLines={1}>Planning</SW.HeaderText>
      {toggleInfo && (
        <PlanningInfo onWeekChange={onWeekChange} onTeamChange={onTeamChange} />
      )}
    </SW.Wrapper>
  );
};

export default connect(state => ({
  teams: state.teams,
  myId: state.me.get('user_id'),
}))(PlanningOverview);
