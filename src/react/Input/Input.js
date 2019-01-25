import React, { PureComponent } from 'react';
import SW from './Input.swiss';

export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      secureTextEntry: props.secureTextEntry || false,
    };
    this.displayToggle = props.secureTextEntry || false;
  }
  render() {
    const { inputRef, ...rest } = this.props;
    const { secureTextEntry } = this.state;

    return (
      <SW.Wrapper>
        <SW.PassToggle
          display={this.displayToggle}
          onPress={() => {
            this.setState({ secureTextEntry: !secureTextEntry });
          }}
        />
        <SW.TextInput
          innerRef={c => {
            if (inputRef) {
              inputRef(c);
            }
          }}
          secureTextEntry={secureTextEntry}
          autoCapitalize={'none'}
          {...rest}
        />
      </SW.Wrapper>
    );
  }
}
