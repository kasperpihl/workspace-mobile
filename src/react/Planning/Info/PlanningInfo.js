import React from 'react';
import { View } from 'react-native';
import Picker from 'src/react/Picker/Picker';
import FormLabel from 'src/react/FormLabel/FormLabel';
import WeekPicker from 'src/react/Planning/WeekPicker/WeekPicker';
import SW from './PlanningInfo.swiss';

export default function PlanningInfo({
  teamId,
  teams,
  yearWeek,
  onWeekChange,
  onTeamChange,
}) {
  return (
    <SW.Wrapper>
      <WeekPicker yearWeek={yearWeek} onChange={onWeekChange} />
      <View style={{ marginTop: 40, width: '100%' }}>
        <FormLabel label={'Pick team'} />
        <Picker values={teams} defaultValue={teamId} onChange={onTeamChange} />
      </View>
    </SW.Wrapper>
  );
}
