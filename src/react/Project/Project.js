import React, { Component } from 'react';
import { SafeAreaView, VirtualizedList, Text } from 'react-native';
import SW from 'src/react/Project/Project.swiss';
import data from './data';

const itemsById = data.itemsById;

export default class Project extends Component {
  renderItem(item) {
    const data = item.item.data;
    const task = itemsById.get(data.get('id'));

    return <SW.Item indent={data.get('indent')}>{task.get('title')}</SW.Item>;
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SW.Wrapper>
          <SW.HeaderText>New Project</SW.HeaderText>
          <VirtualizedList
            getItem={(data, index) => {
              return { key: `${index}`, data: data.get(index) };
            }}
            getItemCount={() => {
              return data.order.size;
            }}
            data={data.order}
            renderItem={this.renderItem}
          />
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
