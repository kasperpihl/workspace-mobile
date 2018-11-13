import React, { Component } from 'react';
import SW from 'src/react/Project/Input/ProjectInput.swiss';

export default class ProjectInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { inputRef, ...rest } = this.props;
    return <SW.Input innerRef={inputRef} {...rest} />;
  }
}
