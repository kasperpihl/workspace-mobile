import React from 'react';
import { View } from 'react-native';
import Picker from 'src/react/Picker/Picker';
import FormLabel from 'src/react/FormLabel/FormLabel';
import WeekPicker from 'src/react/Planning/WeekPicker/WeekPicker';
import FormButton from 'src/react/FormButton/FormButton';
import SW from './PlanningInfo.swiss';

export default function PlanningInfo({
  teamId,
  teams,
  yearWeek,
  onWeekChange,
  onTeamChange,
  setToggleInfo,
}) {
  return (
    <SW.Wrapper>
      <WeekPicker yearWeek={yearWeek} onChange={onWeekChange} />
      <View style={{ marginTop: 40, width: '100%' }}>
        <FormLabel label={'Pick team'} />
        <Picker values={teams} defaultValue={teamId} onChange={onTeamChange} />
      </View>
      <SW.FormButtonWrapper>
        <View style={{ width: '50%' }}>
          <FormButton
            onPress={() => {
              setToggleInfo(false);
            }}
            label={'Done'}
          />
        </View>
      </SW.FormButtonWrapper>
    </SW.Wrapper>
  );
}
