import React, { PureComponent } from 'react';
import { DatePickerIOS } from 'react-native';
import SW from './KeyboardDate.swiss';

export default class KeyboardDate extends PureComponent {
  render() {
    return (
      <SW.Wrapper>
        <DatePickerIOS date={new Date()} />
      </SW.Wrapper>
    );
  }
}
