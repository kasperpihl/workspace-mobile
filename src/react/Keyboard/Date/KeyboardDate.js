// This is used only on iOS
import React, { PureComponent } from 'react';
import { DatePickerIOS } from 'react-native';
import moment from 'moment';
import SW from './KeyboardDate.swiss';

export default class KeyboardDate extends PureComponent {
  constructor(props) {
    super(props);
    const { lastSelectedTask } = this.props;
    const dueDate = lastSelectedTask.get('due_date');
    const initDate = dueDate ? new Date(moment(dueDate)) : new Date();

    this.state = {
      chosenDate: initDate,
    };

    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    const { lastSelectedTask, stateManager } = this.props;
    this.setState({ chosenDate: newDate });
    const dueDate = moment(newDate).format('YYYY-MM-DD');
    stateManager.editHandler.updateDueDate(
      lastSelectedTask.get('task_id'),
      dueDate
    );
  }
  render() {
    return (
      <SW.Wrapper>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          mode="date"
        />
      </SW.Wrapper>
    );
  }
}
