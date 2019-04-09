import React from 'react';
import moment from 'moment';
import parseWeekLabel from 'core/utils/time/parseWeekLabel';
import WeekIndicator from 'src/react/Planning/WeekIndicator/WeekIndicator';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './WeekPicker.swiss';

export default function WeekPicker({ yearWeek, onChange }) {
  const weekLabel = parseWeekLabel(yearWeek);
  const [year, week] = yearWeek.split('-');
  const date = moment();
  date.year(year);
  date.week(week);

  const handlePrev = () => {
    date.subtract(1, 'week');
    let newYearWeek = `${year}-${date.week()}`;
    if (week < date.week()) {
      newYearWeek = `${parseInt(year, 10) - 1}-${date.week()}`;
    }
    onChange(newYearWeek);
  };
  const handleNext = () => {
    date.add(1, 'week');
    let newYearWeek = `${year}-${date.week()}`;
    if (week > date.week()) {
      newYearWeek = `${parseInt(year, 10) + 1}-${date.week()}`;
    }
    onChange(newYearWeek);
  };

  return (
    <SW.Wrapper>
      <SW.ButtonsLabelWrapper>
        <IconTouchableWrapper
          icon={'ArrowLeft'}
          fill={'dark'}
          onPress={() => {
            handlePrev();
          }}
        />
        <SW.WeekLabel>{weekLabel}</SW.WeekLabel>
        {weekLabel !== 'Next week' ? (
          <IconTouchableWrapper
            icon={'ArrowRight'}
            fill={'dark'}
            onPress={() => {
              handleNext();
            }}
          />
        ) : (
          <SW.NextArrowPlaceholder />
        )}
      </SW.ButtonsLabelWrapper>
      <WeekIndicator yearWeek={yearWeek} />
    </SW.Wrapper>
  );
}
