import React, { PureComponent } from 'react';
// import { Input } from 'react-native';
import SW from 'src/react/Project/ProjectInput.swiss';

export default class ProjectInput extends PureComponent {
  render() {
    const { indent, onChangeText, dataId, value } = this.props;

    return (
      <SW.Input
        onChangeText={text => {
          onChangeText(text, dataId);
        }}
        indent={indent}
        value={value}
      />
    );
  }
}
