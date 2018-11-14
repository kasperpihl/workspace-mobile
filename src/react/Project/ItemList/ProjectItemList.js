import React, { PureComponent } from 'react';
import { VirtualizedList } from 'react-native';
import ProjectInput from 'src/react/Project/Input/ProjectInput';

// This part needs optimization. For some reason renderItem renders
// for every item even tho I changed only one of them
export default class ProjectItemList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(item) {
    const {
      itemsById,
      addInputRef,
      onItemFocus,
      onItemTextChange,
    } = this.props;
    const metaData = item.item.data;
    const task = itemsById.get(metaData.get('id'));

    return (
      <ProjectInput
        indent={metaData.get('indent')}
        value={task.get('title')}
        onChangeText={text => {
          onItemTextChange(text, task.get('id'));
        }}
        inputRef={ref => {
          addInputRef(ref, task.get('id'));
        }}
        onFocus={() => {
          onItemFocus(task.get('id'));
        }}
      />
    );
  }
  render() {
    const { visibleOrder } = this.props;

    return (
      <VirtualizedList
        keyboardDismissMode={'on-drag'}
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
    );
  }
}
