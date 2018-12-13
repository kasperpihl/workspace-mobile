import React, { Component } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import SW from 'src/react/Project/Overview/Toolbar.swiss';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';

//In order for LayoutAnimation to work on Android
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width } = Dimensions.get('window');
const IS_SAFE_AREA_SUPPORTED =
  Platform.OS === 'ios' && (height > 800 || width > 800);
const BUMPER_HEIGHT = 15;

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolBarPaddingBottom: 0,
      myKeyboardHeight: 0,
      CurrentKeyboard: null,
    };

    this.keyboardDismissedManually = false;
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }
  componentWillMount() {
    // Keyboard management
    this.keyboardWillShowSubscription = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSubscription = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }
  componentWillUnmount() {
    // Keyboard management
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }
  keyboardWillShow = event => {
    const { showToolbar } = this.props;

    LayoutAnimation.configureNext({
      duration: event.duration,
      update: {
        type: LayoutAnimation.Types[event.easing],
      },
    });

    const keyboardHeight = event.endCoordinates.height;
    const toolBarPaddingBottom =
      keyboardHeight - (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);

    this.setState({
      toolBarPaddingBottom: toolBarPaddingBottom,
      myKeyboardHeight: 0,
    });

    showToolbar();
  };
  keyboardWillHide = event => {
    const { hideToolbar } = this.props;

    let keyboardHeight = 0;
    let shouldHideToolbar = true;

    if (this.keyboardDismissedManually) {
      this.keyboardDismissedManually = false;
      keyboardHeight =
        event.endCoordinates.height -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
      shouldHideToolbar = false;
    }

    LayoutAnimation.configureNext({
      duration: event.duration,
      update: {
        type: LayoutAnimation.Types[event.easing],
      },
    });
    this.setState({
      toolBarPaddingBottom: 0,
      myKeyboardHeight: keyboardHeight,
    });

    if (shouldHideToolbar) {
      hideToolbar();
    }
  };
  renderButtons() {
    const { buttons } = this.props;

    return buttons.map(button => {
      const { icon, fill, onPress, keyboard } = button;
      const checkForKeyboard = () => {
        if (keyboard) {
          this.setState({
            CurrentKeyboard: keyboard,
          });
          this.keyboardDismissedManually = true;
          Keyboard.dismiss();
        }

        if (onPress) {
          onPress();
        }
      };

      return (
        <IconTouchableWrapper
          icon={icon}
          fill={fill}
          onPress={checkForKeyboard}
          width={'22'}
          height={'14'}
        />
      );
    });
  }
  render() {
    let {
      toolBarPaddingBottom,
      myKeyboardHeight,
      CurrentKeyboard,
    } = this.state;
    const { whileHiddenView, toolbarHidden } = this.props;

    if (toolbarHidden) {
      toolBarPaddingBottom = 0;
      myKeyboardHeight = 0;
      CurrentKeyboard = null;
    }

    return (
      <View
        style={{
          paddingBottom: toolBarPaddingBottom,
        }}
      >
        <SW.ToolbarWrapper toolBarAlwaysVisible={!toolbarHidden}>
          {this.renderButtons()}
        </SW.ToolbarWrapper>
        <View style={{ height: myKeyboardHeight }}>
          <SW.MyKeyboard>
            {CurrentKeyboard ? <CurrentKeyboard /> : null}
          </SW.MyKeyboard>
        </View>
        {toolbarHidden && whileHiddenView}
      </View>
    );
  }
}
