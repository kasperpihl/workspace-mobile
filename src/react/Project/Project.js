import React, { Component } from 'react';
import { SafeAreaView, VirtualizedList, Slider } from 'react-native';
import ProjectInput from 'src/react/Project/ProjectInput';
import SW from 'src/react/Project/Project.swiss';
import ProjectStateManager from 'src/utils/project/ProjectStateManager';
import data from './data';

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        taskId={task.get('id')}
        stateManager={this.stateManager}
      />
    );
  }
  render() {
    const { visibleOrder, sliderValue } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <SW.HeaderText>New Project</SW.HeaderText>
          <Slider
            minimumValue={0}
            maximumValue={4}
            onValueChange={this.onSliderChange}
            value={sliderValue}
          />
          <VirtualizedList
            getItem={(data, index) => {
              return { key: `${index}`, data: data.get(index) };
            }}
            getItemCount={() => {
              return visibleOrder.size;
            }}
            data={visibleOrder}
            renderItem={this.renderItem}
          />
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
