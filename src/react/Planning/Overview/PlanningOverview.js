import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';
import { Navigation } from 'react-native-navigation';
import timeGetDefaultWeekYear from 'core/utils/time/timeGetDefaultWeekYear';
import PlanningInfo from 'src/react/Planning/Info/PlanningInfo.js';
import PlanningTasks from 'src/react/Planning/Tasks/PlanningTasks.js';
import colors from 'src/utils/colors';
import SW from './PlanningOverview.swiss';

const PlanningOverview = ({ teams, myId }) => {
  const teamsMap = teams
    .toList()
    .map(team => {
      return Map({ label: team.get('name'), value: team.get('team_id') });
    })
    .concat(fromJS([{ label: 'Personal', value: myId }]));
  const [toggleInfo, setToggleInfo] = useState(false);
  const [yearWeek, setYearWeek] = useState(timeGetDefaultWeekYear());
  const [teamId, setTeamId] = useState(teamsMap.get(0).get('value'));
  const onToggleInfo = () => {
    setToggleInfo(!toggleInfo);
  };
  const onWeekChange = yW => {
    setYearWeek(yW);
  };
  const onTeamChange = teamId => {
    setTeamId(teamId);
  };
  const infoButton = {
    id: 'Info',
    component: {
      name: 'IconTouchableWrapper',
      passProps: {
        icon: 'Info',
        fill: toggleInfo ? 'base' : 'sw1',
        style: toggleInfo
          ? { backgroundColor: colors['green'] }
          : { backgroundColor: 'transparent' },
        onPress: () => {
          onToggleInfo();
        },
      },
    },
  };

  useEffect(() => {
    Navigation.mergeOptions('PlanningOverview', {
      topBar: {
        rightButtons: [infoButton],
      },
    });
  }, [toggleInfo]);

  return (
    <SW.Wrapper>
      <SW.HeaderText numberOfLines={1}>Planning</SW.HeaderText>
      <SW.GreyBorder />
      {toggleInfo && (
        <PlanningInfo
          teamId={teamId}
          teams={teamsMap}
          yearWeek={yearWeek}
          onWeekChange={onWeekChange}
          onTeamChange={onTeamChange}
        />
      )}
      {!toggleInfo && (
        <PlanningTasks
          teamId={teamId}
          yearWeek={yearWeek}
          setToggleInfo={setToggleInfo}
        />
      )}
    </SW.Wrapper>
  );
};

export default connect(state => ({
  teams: state.teams,
  myId: state.me.get('user_id'),
}))(PlanningOverview);
