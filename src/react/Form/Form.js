/* 
  Usage:

  <Form>
    <FormTextInput ... /> -> This is going to have 'Next' for return key
    <FormTextInput last ... /> -> This is going to have 'Go' for return key
  </Form> 
*/

import React from 'react';
import { View } from 'react-native';
import FormTextInput from './TextInput/FormTextInput';

class Form extends React.Component {
  inputs = [];
  inputCount = -1;
  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child) return;

      if (child.props.children)
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children),
        });

      if (child.type.name !== 'FormTextInput') return child;

      this.inputCount = this.inputCount + 1;

      // Creating a block scoped variable of this.inputCount
      const inputCount = this.inputCount;

      return React.cloneElement(child, {
        returnKeyType: child.props.last ? 'go' : 'next',
        onEnter: () => {
          const nextInputIndex = inputCount + 1;

          this.inputs[nextInputIndex]
            ? this.inputs[nextInputIndex].focus()
            : null;
        },
        inputRef: ref => (this.inputs[inputCount] = ref),
      });
    });
  }
  render() {
    let { children, ...props } = this.props;

    return <View {...props}>{this.renderChildren(children)}</View>;
  }
}

export { Form, FormTextInput };
