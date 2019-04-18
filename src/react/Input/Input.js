import React, { PureComponent } from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from './Input.swiss';

export default class Input extends PureComponent {
  state = {
    value: this.props.value || '',
    secureTextEntry: false,
    focused: false,
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
  handleOnFocus = () => {
    this.setState({ focused: true });
  };
  handleOnBlur = () => {
    this.setState({ focused: false });
  };
  render() {
    const { inputRef, ...rest } = this.props;
    const { secureTextEntry, focused } = this.state;
    const iconColor = secureTextEntry ? 'sw3' : 'dark';

    return (
      <SW.Wrapper>
        {this.displayToggle && (
          <SW.PassToggle onPress={this.changeFieldSecutiry}>
            <Icon name={'Eye'} fill={iconColor} />
          </SW.PassToggle>
        )}
        <SW.TextInput
          focused={focused}
          innerRef={c => {
            if (inputRef) {
              inputRef(c);
            }
          }}
          secureTextEntry={secureTextEntry}
          autoCapitalize={'none'}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          {...rest}
        />
      </SW.Wrapper>
    );
  }
}
