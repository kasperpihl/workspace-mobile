import React, { Component } from 'react';
import {
  SafeAreaView,
  VirtualizedList,
  Slider,
  Keyboard,
  Animated,
} from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import ProjectInput from 'src/react/Project/ProjectInput';
import SW from 'src/react/Project/Project.swiss';
import ProjectStateManager from 'src/utils/project/ProjectStateManager';
import data from './data';

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
    this.state = {
      toolBaralwaysVisible: false,
      keyboardHeightAnimation: new Animated.Value(0),
    };
    this.lastFocusedInputRefId = null;
    this.renderItem = this.renderItem.bind(this);
  }
  componentWillMount() {
    this.stateManager = new ProjectStateManager(
      data.order,
      data.itemsById,
      this.onStateChange
    );
    this.setState(this.stateManager.getState());
  }
  componentWillUnmount() {
    this.stateManager.destroy();
  }
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
      toolBaralwaysVisible,
      keyboardHeightAnimation,
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
          <KeyboardAccessoryView
            avoidKeyboard
            alwaysVisible={toolBaralwaysVisible}
            hideBorder={true}
          >
            <SW.ToolbarWrapper>
              <SW.ChangeKeyboard
                onPress={() => {
                  Keyboard.dismiss();
                  this.setState({
                    toolBaralwaysVisible: true,
                  });
                  Animated.sequence([
                    Animated.delay(500),
                    Animated.timing(this.state.keyboardHeightAnimation, {
                      toValue: 260,
                      duration: 150,
                    }),
                  ]).start();
                }}
              />
              <SW.ResetKeyboard
                onPress={() => {
                  if (this.lastFocusedInputRefId) {
                    this.inputRefs[this.lastFocusedInputRefId].focus();
                  }
                  this.setState({
                    toolBaralwaysVisible: false,
                  });
                  Animated.sequence([
                    Animated.timing(this.state.keyboardHeightAnimation, {
                      toValue: 0,
                      duration: 0,
                    }),
                  ]).start();
                }}
              />
            </SW.ToolbarWrapper>
            <Animated.View
              style={{ width: '100%', height: keyboardHeightAnimation }}
            >
              <SW.TestKeyboard visible={toolBaralwaysVisible} />
            </Animated.View>
          </KeyboardAccessoryView>
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
