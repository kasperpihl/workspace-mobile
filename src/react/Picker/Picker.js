import React, { PureComponent } from 'react';
import SW from './Picker.swiss';

export default class Picker extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.selectedValue || null,
    };
  }
  onPressHandler(value) {
    const { onChange } = this.props;

    onChange(value);

    this.setState({
      selectedValue: value,
    });
  }
  render() {
    const { values } = this.props;
    const { selectedValue } = this.state;

    return (
      <SW.Wrapper>
        {values.map(item => {
          return (
            <SW.PickerItem
              key={item.get('value')}
              selected={item.get('value') === selectedValue}
              onPress={() => {
                this.onPressHandler(item.get('value'));
              }}
            >
              <SW.Label>{item.get('label')}</SW.Label>
            </SW.PickerItem>
          );
        })}
      </SW.Wrapper>
    );
  }
}
