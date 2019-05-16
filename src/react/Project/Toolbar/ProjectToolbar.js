import React, { PureComponent } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  // UIManager,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePickerAndroid from 'react-native-image-picker';
import ModalSelector from 'react-native-modal-selector';
import DialogInput from 'react-native-dialog-input';
import SW from './ProjectToolbar.swiss';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import TextButton from 'src/react/TextButton/TextButton';
import uploadImageToS3 from 'src/utils/uploadImageToS3';

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
    dialogVisible: false,
  };
  keyboardOriginalHeight = 0;
  layoutAnimationKeyboardDuration = 250;
  layoutAnimationKeyboardEasing =
    Platform.OS === 'android' ? 'linear' : 'keyboard';
  onAttach = null;
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
      this.keyboardShow
    );
    this.keyboardHideSubscription = Keyboard.addListener(
      `${keyboardSubType}Hide`,
      this.keyboardHide
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
  resetCustomKeyboardState = () => {
    this.setState({
      myKeyboardHeight: 0,
      CustomKeyboard: null,
      customKeyboardProps: {},
      customKeyboardIsShown: false,
    });
  };
  openiOSImagePicker() {
    const { setLoadingAttachment, ownedBy } = this.props;
    ImagePicker.openPicker({
      multiple: true, // T_TODO should be false on Android
      maxFiles: 1,
    }).then(async files => {
      const file = await uploadImageToS3(
        files[0],
        setLoadingAttachment,
        ownedBy
      );
      setLoadingAttachment(false);
      this.onAttach('file', file.file_id, file.file_name);
      // Module is creating tmp images which are going to be cleaned up
      // automatically somewhere in the future. If you want to force cleanup,
      // you can use clean to clean all tmp files
      ImagePicker.clean();
    });
  }

  openAndroidImagePicker() {
    const { setLoadingAttachment, ownedBy } = this.props;
    ImagePickerAndroid.showImagePicker({}, async response => {
      if (!response.data) {
        return;
      }

      const file = response;
      file.mime = response.type;
      file.filename = response.fileName;
      file.path = response.uri;

      const fileRes = await uploadImageToS3(
        file,
        setLoadingAttachment,
        ownedBy
      );
      setLoadingAttachment(false);
      this.onAttach('file', fileRes.file_id, fileRes.file_name);
    });
  }
  renderButtons() {
    const { buttons, onPressDoneButton, onPressBackButton } = this.props;
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

      // T_TODO refactor this shit.
      // it's super bad but it's fast to write it like that
      if (icon === 'Attach') {
        if (onPress) {
          this.onAttach = onPress;
        }

        let index = 0;
        const data = [
          { key: index++, section: true, label: 'Attach' },
          { key: index++, label: 'Photo or video' },
          { key: index++, label: 'URL' },
        ];

        // T_TODO refactor this out of that file ffs
        return (
          <ModalSelector
            key={i}
            data={data}
            animationType="fade"
            onModalOpen={() => {
              onPressDoneButton();
            }}
            onModalClose={() => {
              onPressBackButton();
            }}
            onChange={option => {
              if (option.key === 1) {
                if (Platform.OS === 'ios') {
                  this.openiOSImagePicker();
                }

                if (Platform.OS === 'android') {
                  this.openAndroidImagePicker();
                }
              }
              if (option.key === 2) {
                this.openDialog();
              }
              // alert(`${option.label} (${option.key}) nom nom nom`);
            }}
          >
            <IconTouchableWrapper icon={icon} fill={fill} />
          </ModalSelector>
        );
      } else {
        return (
          <IconTouchableWrapper
            key={i}
            icon={icon}
            fill={fill}
            onPress={onPressLocal}
          />
        );
      }
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
        <TextButton
          onPress={onPressLocal}
          title="Done"
          textType="captionDark"
        />
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
        icon={'ArrowLeft'}
        fill={'dark'}
        onPress={() => {
          this.setState({
            customKeyboardIsShown: false,
          });
          onPressBackButton();
        }}
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
  openDialog() {
    this.setState({
      dialogVisible: true,
    });
  }
  closeDialog() {
    const { onPressBackButton } = this.props;

    this.setState({
      dialogVisible: false,
    });
    onPressBackButton();
  }
  // T_TODO refactor DialogInput out of this file ffs
  render() {
    let {
      toolBarPaddingBottom,
      myKeyboardHeight,
      CustomKeyboard,
      customKeyboardProps,
      customKeyboardIsShown,
      dialogVisible,
    } = this.state;
    const { children, hasFocus } = this.props;
    const shouldShow = hasFocus || CustomKeyboard;

    return (
      <View
        style={{
          paddingBottom: toolBarPaddingBottom,
        }}
      >
        <DialogInput
          isDialogVisible={dialogVisible}
          title={'Attach url'}
          message={'Enter the url you want to attach'}
          hintInput={'https://'}
          submitInput={inputText => {
            // T_TODO validate if it is an actual link
            if (inputText.length > 0) {
              const title = inputText.replace(/^https?:\/\//, '');
              const id = `https://${title}`;
              this.onAttach('url', id, title);
              this.closeDialog();
            }
          }}
          closeDialog={() => {
            this.closeDialog();
          }}
          dialogStyle={{ marginBottom: 100 }}
        />
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
