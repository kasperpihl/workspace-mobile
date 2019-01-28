import React, { PureComponent } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
  Dimensions,
  Button,
} from 'react-native';
import SW from './ProjectToolbar.swiss';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';

//In order for LayoutAnimation to work on Android
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const { height, width } = Dimensions.get('window');
const IS_SAFE_AREA_SUPPORTED =
  Platform.OS === 'ios' && (height > 800 || width > 800);
const BUMPER_HEIGHT = 15;

export default class ProjectToolbar extends PureComponent {
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
  };
  keyboardWillHide = event => {
    let keyboardHeight = 0;
    if (this.keyboardDismissedManually) {
      this.keyboardDismissedManually = false;
      keyboardHeight =
        event.endCoordinates.height -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
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
  };
  renderButtons() {
    const { buttons } = this.props;

    return buttons.map((button, i) => {
      const { icon, fill, onPress, keyboard } = button;
      const onPressLocal = () => {
        // Check if custom keyboard option is assigned
        if (keyboard) {
          this.setState({
            CurrentKeyboard: keyboard,
          });

          // if there is custom keyboard we want to show it
          // and manually hide the original one
          this.keyboardDismissedManually = true;
          Keyboard.dismiss();
        }

        // if there is onPress fuction assigned
        if (onPress) {
          onPress();
        }
      };

      return (
        <IconTouchableWrapper
          key={i}
          icon={icon}
          fill={fill}
          onPress={onPressLocal}
          width={'22'}
          height={'14'}
        />
      );
    });
  }
  renderDoneButton() {
    const { onPressDoneButton } = this.props;
    const onPressLocal = () => {
      // Reset the custom keyboard
      this.setState({
        CurrentKeyboard: null,
      });

      if (onPressDoneButton) {
        onPressDoneButton();
      }
    };

    return (
      <SW.RightButton>
        <Button onPress={onPressLocal} title="Done" />
      </SW.RightButton>
    );
  }
  render() {
    let {
      toolBarPaddingBottom,
      myKeyboardHeight,
      CurrentKeyboard,
    } = this.state;
    const { children, hasFocus } = this.props;

    const shouldShow = hasFocus || CurrentKeyboard;

    if (!shouldShow) {
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
        <SW.ToolbarWrapper show={shouldShow}>
          {this.renderButtons()}
          {this.renderDoneButton()}
        </SW.ToolbarWrapper>
        <View style={{ height: myKeyboardHeight }}>
          <SW.MyKeyboard>
            {CurrentKeyboard ? <CurrentKeyboard /> : null}
          </SW.MyKeyboard>
        </View>
        {!shouldShow && children}
      </View>
    );
  }
}
