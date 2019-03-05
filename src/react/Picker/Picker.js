import React, { Component } from 'react';
import SW from './Picker.swiss';

export default class Picker extends Component {
  constructor(props) {
    super(props);

    let defaultSelection = null;

    if (!props.multiselect) {
      defaultSelection = this.props.defaultValue || null;
    } else {
      defaultSelection = this.props.defaultValue || [];

      if (Array.isArray(defaultSelection)) {
        defaultSelection = new Set(defaultSelection);
      } else {
        throw 'If multiselect - defaultValue should be an array';
      }
    }

    this.state = {
      selection: defaultSelection,
    };
  }
  onPressHandler = value => {
    const { multiselect, onChange } = this.props;
    const { selection } = this.state;

    if (!multiselect) {
      this.setState({
        selection: value,
      });

      onChange(value);
    } else {
      const action = selection.has(value) ? 'delete' : 'add';

      selection[action](value);
      this.setState({
        selection: selection,
      });

      onChange(Array.from(selection));
    }
  };
  isSelected = value => {
    const { multiselect } = this.props;
    const { selection } = this.state;

    if (!multiselect) {
      return selection === value;
    }

    return selection.has(value);
  };
  render() {
    const { values } = this.props;

    return (
      <SW.Wrapper>
        {values.map(item => {
          if (React.isValidElement(item)) {
            return (
              <SW.PickerItem
                key={item.key}
                selected={this.isSelected(item.key)}
                onPress={() => {
                  this.onPressHandler(item.key);
                }}
              >
                {item}
              </SW.PickerItem>
            );
          } else {
            return (
              <SW.PickerItem
                key={item.get('value')}
                selected={this.isSelected(item.get('value'))}
                onPress={() => {
                  this.onPressHandler(item.get('value'));
                }}
              >
                <SW.Label>{item.get('label')}</SW.Label>
              </SW.PickerItem>
            );
          }
        })}
      </SW.Wrapper>
    );
  }
}
