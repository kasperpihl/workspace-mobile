import React, { PureComponent } from 'react';
import SW from './Input.swiss';

export default class Input extends PureComponent {
  state = {
    value: this.props.value || '',
    secureTextEntry: false,
  };
  displayToggle = this.props.passwordField || false;
  changeFieldSecutiry = () => {
    const { secureTextEntry } = this.state;

    this.setState({ secureTextEntry: !secureTextEntry });
  };
  componentDidMount() {
    const { passwordField } = this.props;

    if (passwordField) {
      this.changeFieldSecutiry();
    }
  }
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
