import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import { Slider, Text } from 'react-native';
import { VirtualizedList } from 'react-native';
import withRequests from 'swipes-core-js/components/withRequests';
import ProjectProvider from 'swipes-core-js/components/project/ProjectProvider';
import ProjectStateManager from 'swipes-core-js/classes/ProjectStateManager';
import ProjectTask from 'src/react/Project/Task/ProjectTask';
import SW from './ProjectOverview.swiss';
import ProjectToolbar from 'src/react/Project/Toolbar/ProjectToolbar';
// import KeyboardDate from 'src/react/Keyboard/Date/KeyboardDate';
import KeyboardAssign from 'src/react/Keyboard/Assign/KeyboardAssign';

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

@withRequests(
  {
    project: {
      request: {
        url: 'project.get',
        body: props => ({
          project_id: props.projectId,
        }),
        resPath: 'result',
      },
      cache: {
        path: props => ['project', props.projectId],
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
      selectedId: this.stateManager.getLocalState().get('selectedId'),
      visibleOrder: this.stateManager.getLocalState().get('visibleOrder'),
    };
    this.inputRefs = {};

    Navigation.events().bindComponent(this, 'ProjectOverview');
  }
  navigationButtonPressed = ({ buttonId }) => {
    // TODO edit, discuss
  };
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

      if (selectedId && selectedId !== this.lastSelectedId) {
        this.lastSelectedId = selectedId;
      }
    });

    Navigation.mergeOptions('ProjectOverview', {
      topBar: {
        rightButtons: defaultButtons,
      },
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.stateManager.syncHandler.syncIfNeeded();
  }
  handleSliderChange = value => {
    const depth = parseInt(value, 10);
    this.stateManager.expandHandler.setDepth(depth);
  };
  onItemIndent = () => {
    const selectedId = this.stateManager.getLocalState().get('selectedId');
    this.stateManager.indentHandler.indent(selectedId);
  };
  onItemOutdent = () => {
    const selectedId = this.stateManager.getLocalState().get('selectedId');
    this.stateManager.indentHandler.outdent(selectedId);
  };
  getItemCount = data => data.size;
  getItem = (data, index) => ({
    key: data.get(index),
    taskId: data.get(index),
  });
  renderItem = ({ item }) => <ProjectTask taskId={item.taskId} />;
  render() {
    const { visibleOrder, selectedId } = this.state;
    return (
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
          <ProjectToolbar
            hasFocus={!!selectedId}
            onPressDoneButton={() => {
              const selectedId = this.stateManager
                .getLocalState()
                .get('selectedId');
              this.stateManager.selectHandler.deselect(selectedId);
            }}
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
                icon: 'members',
                fill: 'blue',
                keyboard: KeyboardAssign,
              },
            ]}
          >
            <SW.SliderWrapper>
              <Slider
                minimumValue={0}
                maximumValue={4}
                onValueChange={this.handleSliderChange}
                value={0}
              />
            </SW.SliderWrapper>
          </ProjectToolbar>
        </SW.Wrapper>
      </ProjectProvider>
    );
  }
}
