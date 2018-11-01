import React, { PureComponent } from "react";
import SW from "./Input.swiss";

export default class Input extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || "",
      secureTextEntry: props.secureTextEntry || false
    };
    this.displayToggle = props.secureTextEntry || false;
  }
  render() {
    const { label, textContentType } = this.props;
    const { value, secureTextEntry } = this.state;

    return (
      <SW.Wrapper>
        <SW.Label>{label}</SW.Label>
        <SW.PassToggle
          display={this.displayToggle}
          onPress={() => {
            this.setState({ secureTextEntry: !secureTextEntry });
          }}
        />
        <SW.TextInput
          secureTextEntry={secureTextEntry}
          textContentType={textContentType}
          autoCapitalize={"none"}
          onChangeText={value => {
            this.setState({ value });
          }}
          value={value}
        />
      </SW.Wrapper>
    );
  }
}
