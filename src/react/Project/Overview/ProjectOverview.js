import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import { List } from 'immutable';
import { SafeAreaView, Slider, Text } from 'react-native';
import { VirtualizedList } from 'react-native';

import withRequests from 'swipes-core-js/components/withRequests';
import ProjectProvider from 'swipes-core-js/components/project/ProjectProvider';
import ProjectStateManager from 'swipes-core-js/classes/ProjectStateManager';

import ProjectTask from 'src/react/Project/Task/ProjectTask';
import RangeToHighlight from 'src/react/Project/Overview/RangeToHighlight';
import SW from 'src/react/Project/Overview/ProjectOverview.swiss';
import Toolbar from 'src/react/Project/Overview/Toolbar';
import KeyboardDate from 'src/react/Project/Keyboards/Date/KeyboardDate';
import KeyboardAssign from 'src/react/Project/Keyboards/Assign/KeyboardAssign';

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

@withRequests(
  {
    project: {
      request: {
        url: 'project.get',
        body: props => ({
          project_id: 'A123131',
        }),
        resPath: 'result',
      },
      cache: {
        path: props => ['project', 'A123131'],
      },
    },
  },
  { renderLoader: () => <Text>loading</Text> }
)
export default class ProjectOverview extends PureComponent {
  constructor(props) {
    super(props);
    this.stateManager = new ProjectStateManager(props.project);
    this.state = {
      rangeToHighlight: List(),
      indentToHightlight: 0,
      toolbarHidden: true,
      selectedId: this.stateManager.getLocalState().get('selectedId'),
      visibleOrder: this.stateManager.getLocalState().get('visibleOrder'),
    };
    this.inputRefs = {};
    Navigation.events().bindComponent(this, 'ProjectOverview');
  }
  componentDidMount() {
    this.unsubscribe = this.stateManager.subscribe(stateManager => {
      const selectedId = this.stateManager.getLocalState().get('selectedId');
      const visibleOrder = stateManager.getLocalState().get('visibleOrder');
      if (
        visibleOrder !== this.state.visibleOrder ||
        selectedId !== this.state.selectedId
      ) {
        this.setState({ visibleOrder, selectedId });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.stateManager.syncHandler.syncIfNeeded();
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId == 'Done') {
      Navigation.mergeOptions('ProjectOverview', {
        topBar: { rightButtons: defaultButtons },
      });

      this.onItemBlur();
      this.hideToolbar();
    }
  };
  handleSliderChange = value => {
    const depth = parseInt(value, 10);
    this.stateManager.expandHandler.setDepth(depth);
  };
  onItemFocus = (taskId, indent) => {
    const { order } = this.state;

    this.lastFocusedInputRefId = taskId;
    this.stateManager.selectHandler.select(taskId);
    this.setState({
      rangeToHighlight: RangeToHighlight(order, taskId),
      indentToHightlight: indent,
    });

    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        rightButtons: onFocusButtons,
      },
    });
  };
  onItemIndent = () => {
    const selectedId = this.stateManager.getLocalState().get('selectedId');
    this.stateManager.indentHandler.indent(selectedId);
  };
  onItemOutdent = () => {
    const selectedId = this.stateManager.getLocalState().get('selectedId');
    this.stateManager.indentHandler.outdent(selectedId);
  };
  showToolbar = () => {
    this.setState({
      toolbarHidden: false,
    });
  };
  hideToolbar = () => {
    this.setState({
      toolbarHidden: true,
    });
  };
  getItemCount = data => data.size;
  getItem = (data, index) => {
    console.log(index, data);
    return {
      key: data.get(index),
      taskId: data.get(index),
    };
  };
  renderItem = ({ item }) => {
    return <ProjectTask taskId={item.taskId} />;
  };
  render() {
    const { visibleOrder, toolbarHidden } = this.state;
    console.log('statem', visibleOrder.toJS());
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ProjectProvider stateManager={this.stateManager}>
          <SW.Wrapper>
            <VirtualizedList
              keyboardDismissMode={'none'}
              keyboardShouldPersistTaps={'always'}
              getItem={this.getItem}
              getItemCount={this.getItemCount}
              data={visibleOrder}
              renderItem={this.renderItem}
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
                    onValueChange={this.handleSliderChange}
                    value={0}
                  />
                </SW.SliderWrapper>
              }
            />
          </SW.Wrapper>
        </ProjectProvider>
      </SafeAreaView>
    );
  }
}
