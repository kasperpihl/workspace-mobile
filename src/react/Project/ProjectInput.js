import React, { PureComponent } from 'react';
import SW from 'src/react/Project/ProjectInput.swiss';

export default class ProjectInput extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { indent, stateManager, taskId, value } = this.props;

    return (
      <SW.Input
        onChangeText={text => {
          stateManager.editHandler.updateTitle(taskId, text);
        }}
        indent={indent}
        value={value}
      />
    );
  }
}
