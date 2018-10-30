import React, { PureComponent } from "react";
import SW from "./Input.swiss";

export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || ""
    };
  }
  render() {
    const { label, textContentType, secureTextEntry = false } = this.props;
    const { value } = this.state;

    return (
      <SW.Wrapper>
        <SW.Label>{label}</SW.Label>
        <SW.TextInput
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          onChangeText={value => {
            this.setState({ value });
          }}
          value={value}
        />
      </SW.Wrapper>
    );
  }
}
