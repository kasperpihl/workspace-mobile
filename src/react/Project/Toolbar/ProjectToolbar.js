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
  state = {
    toolBarPaddingBottom: 0,
    myKeyboardHeight: 0,
    CustomKeyboard: null,
    customKeyboardProps: {},
    customKeyboardIsShown: false,
  };
  layoutAnimationKeyboardDuration = null;
  layoutAnimationKeyboardEasing = null;
  configureNextLayoutAnimation = () => {
    LayoutAnimation.configureNext({
      duration: this.layoutAnimationKeyboardDuration,
      update: {
        type: LayoutAnimation.Types[this.layoutAnimationKeyboardEasing],
      },
    });
  };
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.hasFocus !== prevProps.hasFocus &&
      this.props.hasFocus === true
    ) {
      this.setState({
        customKeyboardIsShown: false,
      });
    }
  }
  keyboardWillShow = event => {
    const keyboardHeight = event.endCoordinates.height;
    const toolBarPaddingBottom =
      keyboardHeight - (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);

    this.layoutAnimationKeyboardDuration = event.duration;
    this.layoutAnimationKeyboardEasing = event.easing;

    this.configureNextLayoutAnimation();

    this.setState({
      toolBarPaddingBottom: toolBarPaddingBottom,
      myKeyboardHeight: 0,
    });
  };
  keyboardWillHide = event => {
    const { CustomKeyboard } = this.state;
    let keyboardHeight = 0;

    if (CustomKeyboard) {
      keyboardHeight =
        event.endCoordinates.height -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
    }

    this.configureNextLayoutAnimation();

    this.setState({
      toolBarPaddingBottom: 0,
      myKeyboardHeight: keyboardHeight,
    });
  };
  resetCustomKeyboardState = () => {
    this.setState({
      myKeyboardHeight: 0,
      CustomKeyboard: null,
      customKeyboardProps: {},
      customKeyboardIsShown: false,
    });
  };
  renderButtons() {
    const { buttons } = this.props;
    const { customKeyboardIsShown } = this.state;

    if (customKeyboardIsShown) {
      return null;
    }

    return buttons.map((button, i) => {
      const { icon, fill, onPress, keyboard, getKeyboardProps } = button;
      const onPressLocal = () => {
        // Check if custom keyboard option is assigned
        let keyboardProps = {};
        if (keyboard) {
          if (getKeyboardProps) {
            keyboardProps = getKeyboardProps();
          }

          this.setState({
            CustomKeyboard: keyboard,
            customKeyboardProps: keyboardProps,
            customKeyboardIsShown: true,
          });

          // Dismiss the keyboard manually so we can show our custom keyboard
          Keyboard.dismiss();
        }

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
      this.configureNextLayoutAnimation();
      this.resetCustomKeyboardState();

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
  renderBackButton() {
    const { onPressBackButton } = this.props;
    const { customKeyboardIsShown } = this.state;

    if (!customKeyboardIsShown) {
      return null;
    }

    return (
      <IconTouchableWrapper
        icon={'back'}
        fill={'blue'}
        onPress={() => {
          this.setState({
            customKeyboardIsShown: false,
          });
          onPressBackButton();
        }}
        width={'22'}
        height={'14'}
      />
    );
  }
  render() {
    let {
      toolBarPaddingBottom,
      myKeyboardHeight,
      CustomKeyboard,
      customKeyboardProps,
    } = this.state;
    const { children, hasFocus } = this.props;
    const shouldShow = hasFocus || CustomKeyboard;

    return (
      <View
        style={{
          paddingBottom: toolBarPaddingBottom,
        }}
      >
        <SW.ToolbarWrapper show={shouldShow}>
          {this.renderBackButton()}
          {this.renderButtons()}
          {this.renderDoneButton()}
        </SW.ToolbarWrapper>
        <View style={{ height: myKeyboardHeight }}>
          <SW.MyKeyboard>
            {CustomKeyboard && <CustomKeyboard {...customKeyboardProps} />}
          </SW.MyKeyboard>
        </View>
        {!shouldShow && children}
      </View>
    );
  }
}
