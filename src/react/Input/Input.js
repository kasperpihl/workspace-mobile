import React, { PureComponent } from 'react';
import SW from './Input.swiss';

export default class Input extends PureComponent {
  state = {
    value: this.props.value || '',
    secureTextEntry: this.props.secureTextEntry || false,
  };
  displayToggle = this.props.secureTextEntry || false;
  changeFieldSecutiry = () => {
    const { secureTextEntry } = this.state;

    this.setState({ secureTextEntry: !secureTextEntry });
  };
  render() {
    const { inputRef, ...rest } = this.props;
    const { secureTextEntry } = this.state;

    return (
      <SW.Wrapper>
        {this.displayToggle && (
          <SW.PassToggle onPress={this.changeFieldSecutiry} />
        )}
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
