import React, { Component } from 'react';
import { SafeAreaView, VirtualizedList, Text } from 'react-native';
import ProjectInput from 'src/react/Project/ProjectInput';
import SW from 'src/react/Project/Project.swiss';
import data from './data';

export default class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: data.order,
      itemsById: data.itemsById,
    };
    this.onChangeProjectInputHandler = this.onChangeProjectInputHandler.bind(
      this
    );
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(item) {
    const { itemsById } = this.state;
    const data = item.item.data;
    const task = itemsById.get(data.get('id'));

    return (
      <ProjectInput
        onChangeText={this.onChangeProjectInputHandler}
        indent={data.get('indent')}
        value={task.get('title')}
        dataId={data.get('id')}
      />
    );
  }
  onChangeProjectInputHandler(text, dataId) {
    const { itemsById } = this.state;

    this.setState({
      itemsById: itemsById.setIn([dataId, 'title'], text),
    });
  }
  render() {
    const { order, itemsById } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <SW.HeaderText>New Project</SW.HeaderText>
          <VirtualizedList
            getItem={(data, index) => {
              return { key: `${index}`, data: data.get(index) };
            }}
            getItemCount={() => {
              return order.size;
            }}
            data={order}
            renderItem={this.renderItem}
          />
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
