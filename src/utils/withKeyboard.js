import React, { Component } from 'react';
import { Keyboard, Platform } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';

let keyboardSubType = 'keyboardWill';
if (Platform.OS === 'android') {
  keyboardSubType = 'keyboardDid';
}
export default WrappedComponent => {
  class WithKeyboard extends Component {
    state = {
      keyboardIsShown: false,
    };
    componentWillMount() {
      this.keyboardShowSubscription = Keyboard.addListener(
        `${keyboardSubType}Show`,
        this.keyboardShow
      );
      this.keyboardHideSubscription = Keyboard.addListener(
        `${keyboardSubType}Hide`,
        this.keyboardHide
      );
    }

    componentWillUnmount() {
      this.keyboardShowSubscription.remove();
      this.keyboardHideSubscription.remove();
    }

    keyboardShow = () => {
      this.setState({
        keyboardIsShown: true,
      });
    };

    keyboardHide = () => {
      this.setState({
        keyboardIsShown: false,
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          keyboardIsShown={this.state.keyboardIsShown}
        />
      );
    }
  }

  hoistNonReactStatics(WithKeyboard, WrappedComponent);

  return WithKeyboard;
};
