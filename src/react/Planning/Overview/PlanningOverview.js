import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';
import { Navigation } from 'react-native-navigation';
import useRequest from 'core/react/_hooks/useRequest';
import timeGetDefaultWeekYear from 'core/utils/time/timeGetDefaultWeekYear';
import PlanningInfo from 'src/react/Planning/Info/PlanningInfo.js';
import colors from 'src/utils/colors';
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
        icon: 'info',
        fill: toggleInfo ? 'sw5' : 'sw1',
        width: '36',
        height: '36',
        style: toggleInfo
          ? { backgroundColor: colors['green1'] }
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
      <SW.TopWrapper>
        <SW.HeaderText numberOfLines={1}>Planning</SW.HeaderText>
      </SW.TopWrapper>
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
