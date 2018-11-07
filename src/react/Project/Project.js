import React, { Component } from 'react';
import {
  SafeAreaView,
  VirtualizedList,
  Slider,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  LayoutAnimation,
  UIManager,
  View,
} from 'react-native';
import ProjectInput from 'src/react/Project/ProjectInput';
import SW from 'src/react/Project/Project.swiss';
import ProjectStateManager from 'src/utils/project/ProjectStateManager';
import data from './data';

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
      toolBaralwaysVisible: false,
    };
    this.inputRefs = {};
    this.keyboardDismissedManually = false;
    this.lastFocusedInputRefId = null;
    this.renderItem = this.renderItem.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
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
    this.setState({
      toolBarPaddingBottom: event.endCoordinates.height,
      myKeyboardHeight: 0,
      toolBaralwaysVisible: true,
    });
  };
  keyboardWillHide = event => {
    let height = 0;
    let hideToolbar = false;

    if (this.keyboardDismissedManually) {
      this.keyboardDismissedManually = false;
      height = event.endCoordinates.height;
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
      myKeyboardHeight: height,
      toolBaralwaysVisible: hideToolbar,
    });
  };
  onStateChange = state => this.setState(state);
  onSliderChange = value => {
    const depth = parseInt(value, 10);
    this.stateManager.indentHandler.enforceIndention(depth);
  };
  renderItem(item) {
    const { itemsById } = this.state;
    const metaData = item.item.data;
    const task = itemsById.get(metaData.get('id'));

    return (
      <ProjectInput
        indent={metaData.get('indent')}
        value={task.get('title')}
        onChangeText={text => {
          this.stateManager.editHandler.updateTitle(task.get('id'), text);
        }}
        inputRef={c => {
          this.inputRefs[task.get('id')] = c;
        }}
        onFocus={() => {
          this.lastFocusedInputRefId = task.get('id');
        }}
      />
    );
  }
  render() {
    const {
      visibleOrder,
      sliderValue,
      toolBarPaddingBottom,
      myKeyboardHeight,
      toolBaralwaysVisible,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <VirtualizedList
            keyboardDismissMode={'none'}
            keyboardShouldPersistTaps={'always'}
            getItem={(data, index) => {
              return { key: `${index}`, data: data.get(index) };
            }}
            getItemCount={() => {
              return visibleOrder.size;
            }}
            data={visibleOrder}
            renderItem={this.renderItem}
          />
          <KeyboardAvoidingView>
            <View style={{ paddingBottom: toolBarPaddingBottom }}>
              <SW.ToolbarWrapper toolBaralwaysVisible={toolBaralwaysVisible}>
                <SW.ChangeKeyboard
                  onPress={() => {
                    this.keyboardDismissedManually = true;
                    Keyboard.dismiss();
                    // this.setState({
                    //   toolBaralwaysVisible: true,
                    // });
                  }}
                />
                <SW.ResetKeyboard
                  onPress={() => {
                    if (this.lastFocusedInputRefId) {
                      this.inputRefs[this.lastFocusedInputRefId].focus();
                    }
                    // this.setState({
                    //   toolBaralwaysVisible: false,
                    // });
                  }}
                />
              </SW.ToolbarWrapper>
              <View style={{ height: myKeyboardHeight }}>
                <SW.MyKeyBoard />
              </View>
            </View>
          </KeyboardAvoidingView>
          <SW.SliderWrapper>
            <Slider
              minimumValue={0}
              maximumValue={4}
              onValueChange={this.onSliderChange}
              value={sliderValue}
            />
          </SW.SliderWrapper>
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
