import React from 'react';
import Picker from 'src/react/Picker/Picker';
import SW from './PlanningInfo.swiss';

export default function PlanningInfo({ onWeekChange, onTeamChange }) {
  return (
    <SW.Wrapper>
      <SW.Text numberOfLines={1}>Info</SW.Text>
    </SW.Wrapper>
  );
}
