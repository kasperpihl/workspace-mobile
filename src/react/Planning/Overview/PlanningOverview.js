import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';
import useRequest from 'core/react/_hooks/useRequest';
import timeGetDefaultWeekYear from 'core/utils/time/timeGetDefaultWeekYear';
import PlanningInfo from 'src/react/Planning/Info/PlanningInfo.js';
import SW from './PlanningOverview.swiss';

const PlanningOverview = ({ teams, myId }) => {
  const teamsMap = teams
    .toList()
    .map(team => {
      return Map({ label: team.get('name'), value: team.get('team_id') });
    })
    .concat(fromJS([{ label: 'Personal', value: myId }]));
  const [toggleInfo, setToggleInfo] = useState(true);
  const [yearWeek, setYearWeek] = useState(timeGetDefaultWeekYear());
  const [teamId, setTeamId] = useState(teamsMap.get(0).get('value'));
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
        <PlanningInfo
          teamId={teamId}
          teams={teamsMap}
          yearWeek={yearWeek}
          onWeekChange={onWeekChange}
          onTeamChange={onTeamChange}
        />
      )}
    </SW.Wrapper>
  );
};

export default connect(state => ({
  teams: state.teams,
  myId: state.me.get('user_id'),
}))(PlanningOverview);
