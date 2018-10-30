import React, { PureComponent } from "react";
import SW from "./FormButton.swiss";

export default class Button extends PureComponent {
  render() {
    const { label } = this.props;

    return (
      <SW.Wrapper>
        <SW.Button>
          <SW.ButtonText>{label}</SW.ButtonText>
        </SW.Button>
      </SW.Wrapper>
    );
  }
}
