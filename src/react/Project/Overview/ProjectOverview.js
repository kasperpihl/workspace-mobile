import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { List } from 'immutable';
import { SafeAreaView, Slider } from 'react-native';
import ProjectItemList from 'src/react/Project/ItemList/ProjectItemList';
import RangeToHighlight from 'src/react/Project/Overview/RangeToHighlight';
import SW from 'src/react/Project/Overview/ProjectOverview.swiss';
import Toolbar from 'src/react/Project/Overview/Toolbar';
import ProjectStateManager from 'src/utils/project/ProjectStateManager';
import KeyboardDate from 'src/react/Project/Keyboards/Date/KeyboardDate';
import KeyboardAssign from 'src/react/Project/Keyboards/Assign/KeyboardAssign';
import data from './data';

console.disableYellowBox = true;

const defaultButtons = [
  {
    id: 'Edit',
    text: 'Edit',
  },
  {
    id: 'Discuss',
    text: 'Discuss',
  },
];

const onFocusButtons = [
  {
    id: 'Done',
    text: 'Done',
  },
];

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rangeToHighlight: List(),
      indentToHightlight: 0,
      toolbarHidden: true,
    };
    this.inputRefs = {};
    this.lastFocusedInputRefId = null;
    this.addInputRef = this.addInputRef.bind(this);
    this.onItemFocus = this.onItemFocus.bind(this);
    this.onItemBlur = this.onItemBlur.bind(this);
    this.onItemTextChange = this.onItemTextChange.bind(this);
    this.onItemIndent = this.onItemIndent.bind(this);
    this.onItemOutdent = this.onItemOutdent.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
    this.onToggleExpand = this.onToggleExpand.bind(this);
    this.showToolbar = this.showToolbar.bind(this);
    this.hideToolbar = this.hideToolbar.bind(this);

    Navigation.events().bindComponent(this, 'ProjectOverview');
  }
  componentWillMount() {
    this.stateManager = new ProjectStateManager(
      data.order,
      data.itemsById,
      this.onStateChange
    );
    this.setState(this.stateManager.getState());
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId == 'Done') {
      Navigation.mergeOptions('ProjectOverview', {
        topBar: { rightButtons: defaultButtons },
      });

      this.onItemBlur();
      this.hideToolbar();
    }
  }
  componentWillUnmount() {
    this.stateManager.destroy();
  }
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
  onItemFocus(taskId, indent) {
    const { order } = this.state;

    this.lastFocusedInputRefId = taskId;
    this.stateManager.selectHandler.selectWithId(taskId);
    this.setState({
      rangeToHighlight: RangeToHighlight(order, taskId),
      indentToHightlight: indent,
    });

    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        rightButtons: onFocusButtons,
      },
    });
  }
  onItemBlur() {
    this.inputRefs[this.lastFocusedInputRefId].blur();
  }
  onItemIndent() {
    this.stateManager.indentHandler.indent(this.lastFocusedInputRefId);
    setTimeout(() => {
      this.inputRefs[this.lastFocusedInputRefId].focus();
    }, 0);
  }
  onItemOutdent() {
    this.stateManager.indentHandler.outdent(this.lastFocusedInputRefId);
    setTimeout(() => {
      this.inputRefs[this.lastFocusedInputRefId].focus();
    }, 0);
  }
  onSubmitEditing(e) {
    this.stateManager.editHandler.enter(e);
  }
  onToggleExpand(taskId) {
    this.stateManager.expandHandler.toggleExpandForId(taskId);
  }
  showToolbar() {
    this.setState({
      toolbarHidden: false,
    });
  }
  hideToolbar() {
    this.setState({
      toolbarHidden: true,
    });
  }
  render() {
    const {
      visibleOrder,
      itemsById,
      selectedIndex,
      rangeToHighlight,
      indentToHightlight,
      toolbarHidden,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <ProjectItemList
            visibleOrder={visibleOrder}
            itemsById={itemsById}
            selectedIndex={selectedIndex}
            rangeToHighlight={rangeToHighlight}
            indentToHightlight={indentToHightlight}
            addInputRef={this.addInputRef}
            onItemFocus={this.onItemFocus}
            onItemTextChange={this.onItemTextChange}
            onSubmitEditing={this.onSubmitEditing}
            onSelectionChange={this.onSelectionChange}
            onToggleExpand={this.onToggleExpand}
          />
          <Toolbar
            toolbarHidden={toolbarHidden}
            hideToolbar={this.hideToolbar}
            showToolbar={this.showToolbar}
            buttons={[
              {
                icon: 'indent_in',
                fill: 'blue',
                onPress: this.onItemIndent,
              },
              {
                icon: 'indent_out',
                fill: 'blue',
                onPress: this.onItemOutdent,
              },
              {
                icon: 'indent_out',
                fill: 'blue',
                keyboard: KeyboardDate,
              },
              {
                icon: 'indent_out',
                fill: 'blue',
                keyboard: KeyboardAssign,
              },
            ]}
            whileHiddenView={
              <SW.SliderWrapper>
                <Slider
                  minimumValue={0}
                  maximumValue={4}
                  onValueChange={this.onSliderChange}
                  value={0}
                />
              </SW.SliderWrapper>
            }
          />
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
