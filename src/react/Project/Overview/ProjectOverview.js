import React, { Component } from 'react';
import {
  SafeAreaView,
  Slider,
  Keyboard,
  LayoutAnimation,
  UIManager,
  View,
  Platform,
  Dimensions,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import ProjectItemList from 'src/react/Project/ItemList/ProjectItemList';
import SW from 'src/react/Project/Overview/ProjectOverview.swiss';
import ProjectStateManager from 'src/utils/project/ProjectStateManager';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import data from './data';

KeyboardManager.setEnableAutoToolbar(false);
KeyboardManager.setKeyboardDistanceFromTextField(0);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IS_SAFE_AREA_SUPPORTED =
  Platform.OS === 'ios' && (windowHeight > 800 || windowWidth > 800);
const BUMPER_HEIGHT = 15;

// T_TODO remove this at some point :D :D
console.disableYellowBox = true;

//In order for LayoutAnimation to work on Android
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolBarPaddingBottom: 0,
      myKeyboardHeight: 0,
      toolBarAlwaysVisible: false,
    };
    this.inputRefs = {};
    this.keyboardDismissedManually = false;
    this.lastFocusedInputRefId = null;
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.addInputRef = this.addInputRef.bind(this);
    this.onItemFocus = this.onItemFocus.bind(this);
    this.onItemTextChange = this.onItemTextChange.bind(this);
    this.onItemIndent = this.onItemIndent.bind(this);
    this.onItemOutdent = this.onItemOutdent.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }
  componentWillMount() {
    this.stateManager = new ProjectStateManager(
      data.order,
      data.itemsById,
      this.onStateChange
    );
    this.setState(this.stateManager.getState());

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
    this.stateManager.destroy();

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

    if (hideToolbar) {
      this.lastFocusedInputRefId = null;
    }
  };
  onStateChange = state => this.setState(state);
  onSliderChange = value => {
    const depth = parseInt(value, 10);
    this.stateManager.indentHandler.enforceIndention(depth);
  };
  addInputRef(ref, taskId) {
    this.inputRefs[taskId] = ref;
  }
  onItemTextChange(text, taskId) {
    // Removing new lines is the only way that I found to simulate
    // single line input with multiline set to true
    this.stateManager.editHandler.updateTitle(taskId, text.replace('\n', ''));
  }
  onItemFocus(taskId) {
    this.lastFocusedInputRefId = taskId;
    this.stateManager.selectHandler.selectWithId(taskId);
  }
  onItemIndent() {
    this.stateManager.indentHandler.indent(this.lastFocusedInputRefId);
    setTimeout(() => {
      this.inputRefs[this.lastFocusedInputRefId].focus();
    }, 0);
  }
  onSubmitEditing(e) {
    this.stateManager.editHandler.enter(e);
  }
  onItemOutdent() {
    this.stateManager.indentHandler.outdent(this.lastFocusedInputRefId);
    setTimeout(() => {
      this.inputRefs[this.lastFocusedInputRefId].focus();
    }, 0);
  }
  render() {
    const {
      visibleOrder,
      itemsById,
      selectedIndex,
      sliderValue,
      toolBarPaddingBottom,
      myKeyboardHeight,
      toolBarAlwaysVisible,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <ProjectItemList
            visibleOrder={visibleOrder}
            itemsById={itemsById}
            selectedIndex={selectedIndex}
            addInputRef={this.addInputRef}
            onItemFocus={this.onItemFocus}
            onItemTextChange={this.onItemTextChange}
            onSubmitEditing={this.onSubmitEditing}
            onSelectionChange={this.onSelectionChange}
          />
          {/* <SW.ToolbarWrapper
            toolBarPaddingBottom={toolBarPaddingBottom}
            toolBarAlwaysVisible={toolBarAlwaysVisible}
          >
            <IconTouchableWrapper
              name={'indent_in'}
              fill={'blue'}
              width="22"
              height="14"
              onPress={this.onItemIndent}
            />
            <IconTouchableWrapper
              name={'indent_out'}
              fill={'blue'}
              width="22"
              height="14"
              onPress={this.onItemOutdent}
            />
            <SW.ChangeKeyboard
              onPress={() => {
                this.keyboardDismissedManually = true;
                Keyboard.dismiss();
              }}
            />
            <SW.ResetKeyboard
              onPress={() => {
                if (this.lastFocusedInputRefId) {
                  this.inputRefs[this.lastFocusedInputRefId].focus();
                }
              }}
            />
          </SW.ToolbarWrapper> */}
          {/* <View
            style={{
              height: myKeyboardHeight,
            }}
          >
            <SW.MyKeyBoard />
          </View> */}
        </SW.Wrapper>
        <SW.SliderWrapper>
          <Slider
            minimumValue={0}
            maximumValue={4}
            onValueChange={this.onSliderChange}
            value={sliderValue}
          />
        </SW.SliderWrapper>
      </SafeAreaView>
    );
  }
}
