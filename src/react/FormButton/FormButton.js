import React, { PureComponent } from "react";
import SW from "./FormButton.swiss";

export default class Button extends PureComponent {
  render() {
    const { label, onPress } = this.props;

    return (
      <SW.Wrapper onPress={onPress}>
        <SW.Button>
          <SW.ButtonText>{label}</SW.ButtonText>
        </SW.Button>
      </SW.Wrapper>
    );
  }
}
