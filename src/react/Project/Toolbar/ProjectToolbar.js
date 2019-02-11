import React, { PureComponent } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  // UIManager,
  View,
  Platform,
  Dimensions,
  Button,
} from 'react-native';
import SW from './ProjectToolbar.swiss';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';

// In order for LayoutAnimation to work on Android
// I'm not doing layoutAnimations on Android because the behaviour is unpredictable
// and the performance is just not good :/
// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

let keyboardSubType = 'keyboardWill';
if (Platform.OS === 'android') {
  keyboardSubType = 'keyboardDid';
}

const { height, width } = Dimensions.get('window');
const IS_SAFE_AREA_SUPPORTED =
  Platform.OS === 'ios' && (height > 800 || width > 800);
const BUMPER_HEIGHT = 15;

export default class ProjectToolbar extends PureComponent {
  state = {
    // This one is always 0 for Android
    toolBarPaddingBottom: 0,
    myKeyboardHeight: 0,
    CustomKeyboard: null,
    customKeyboardProps: {},
    customKeyboardIsShown: false,
    customKeyboardTitle: '',
  };
  keyboardOriginalHeight = 0;
  layoutAnimationKeyboardDuration = 250;
  layoutAnimationKeyboardEasing =
    Platform.OS === 'android' ? 'linear' : 'keyboard';
  configureNextLayoutAnimation = () => {
    // I'm not doing layoutAnimations on Android because the behaviour is unpredictable
    // and the performance is just not good :/
    if (Platform.OS === 'android') {
      return;
    }

    LayoutAnimation.configureNext({
      duration: this.layoutAnimationKeyboardDuration,
      update: {
        type: LayoutAnimation.Types[this.layoutAnimationKeyboardEasing],
      },
    });
  };
  componentWillMount() {
    // Keyboard management
    this.keyboardShowSubscription = Keyboard.addListener(
      `${keyboardSubType}Show`,
      this[`${keyboardSubType}Show`]
    );
    this.keyboardHideSubscription = Keyboard.addListener(
      `${keyboardSubType}Hide`,
      this[`${keyboardSubType}Hide`]
    );
  }
  componentWillUnmount() {
    // Keyboard management
    this.keyboardShowSubscription.remove();
    this.keyboardHideSubscription.remove();
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
  keyboardShow = event => {
    let toolBarPaddingBottom;
    this.keyboardOriginalHeight = event.endCoordinates.height;

    if (Platform.OS === 'ios') {
      toolBarPaddingBottom =
        this.keyboardOriginalHeight -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
    }

    this.layoutAnimationKeyboardDuration =
      event.duration || this.layoutAnimationKeyboardDuration;
    this.layoutAnimationKeyboardEasing =
      event.easing || this.layoutAnimationKeyboardEasing;

    this.configureNextLayoutAnimation();

    this.setState({
      toolBarPaddingBottom: toolBarPaddingBottom,
      myKeyboardHeight: 0,
    });
  };
  keyboardHide = event => {
    const { customKeyboardIsShown } = this.state;
    let keyboardHeight = 0;

    if (customKeyboardIsShown) {
      keyboardHeight =
        this.keyboardOriginalHeight -
        (IS_SAFE_AREA_SUPPORTED ? BUMPER_HEIGHT + 20 : 0);
    }

    this.configureNextLayoutAnimation();

    this.setState({
      toolBarPaddingBottom: 0,
      myKeyboardHeight: keyboardHeight,
    });
  };
  keyboardWillShow = event => {
    this.keyboardShow(event);
  };
  keyboardDidShow = event => {
    this.keyboardShow(event);
  };
  keyboardWillHide = event => {
    this.keyboardHide(event);
  };
  keyboardDidHide = event => {
    this.keyboardHide(event);
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
      const {
        icon,
        fill,
        onPress,
        keyboard,
        getKeyboardProps,
        customKeyboardTitle,
      } = button;
      const onPressLocal = () => {
        // Check if custom keyboard option is assigned
        let keyboardProps = {};

        if (keyboard) {
          if (getKeyboardProps) {
            keyboardProps = getKeyboardProps();
          }

          this.setState({
            customKeyboardTitle,
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
    const { customKeyboardIsShown } = this.state;
    const onPressLocal = () => {
      this.configureNextLayoutAnimation();
      this.resetCustomKeyboardState();

      // Dismiss the keyboard manually because we are done with it.
      // And then way we don't care about bluring the input and handling that case
      Keyboard.dismiss();

      if (onPressDoneButton) {
        onPressDoneButton();
      }
    };

    return (
      <SW.RightButton customKeyboardIsShown={customKeyboardIsShown}>
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
  renderTitle() {
    const { customKeyboardIsShown, customKeyboardTitle } = this.state;

    if (!customKeyboardIsShown) {
      return null;
    }

    return <SW.Title>{customKeyboardTitle}</SW.Title>;
  }
  render() {
    let {
      toolBarPaddingBottom,
      myKeyboardHeight,
      CustomKeyboard,
      customKeyboardProps,
      customKeyboardIsShown,
    } = this.state;
    const { children, hasFocus } = this.props;
    const shouldShow = hasFocus || CustomKeyboard;

    return (
      <View
        style={{
          paddingBottom: toolBarPaddingBottom,
        }}
      >
        <SW.ToolbarWrapper
          show={shouldShow}
          customKeyboardIsShown={customKeyboardIsShown}
        >
          {this.renderBackButton()}
          {this.renderTitle()}
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
