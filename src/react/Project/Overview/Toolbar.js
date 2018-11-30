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
      toolBarAlwaysVisible: false,
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
      toolBarAlwaysVisible: true,
    });
  };
  keyboardWillHide = event => {
    let keyboardHeight = 0;
    let hideToolbar = false;

    if (this.keyboardDismissedManually) {
      this.keyboardDismissedManually = false;
      keyboardHeight =
        event.endCoordinates.height -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
      hideToolbar = true;
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
      toolBarAlwaysVisible: hideToolbar,
    });
  };
  render() {
    const {
      toolBarPaddingBottom,
      myKeyboardHeight,
      toolBarAlwaysVisible,
    } = this.state;
    const { buttons, whileHiddenView } = this.props;

    return (
      <View
        style={{
          paddingBottom: toolBarPaddingBottom,
        }}
      >
        <SW.ToolbarWrapper toolBarAlwaysVisible={toolBarAlwaysVisible}>
          {buttons}
          <SW.ChangeKeyboard
            onPress={() => {
              this.keyboardDismissedManually = true;
              Keyboard.dismiss();
            }}
          />
        </SW.ToolbarWrapper>
        <View style={{ height: myKeyboardHeight }}>
          <SW.MyKeyBoard />
        </View>
        <SW.WhileHiddenView toolBarAlwaysVisible={!toolBarAlwaysVisible}>
          {whileHiddenView}
        </SW.WhileHiddenView>
      </View>
    );
  }
}
