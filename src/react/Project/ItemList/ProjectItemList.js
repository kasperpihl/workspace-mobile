import React, { PureComponent } from 'react';
import { VirtualizedList } from 'react-native';
import ProjectItem from 'src/react/Project/Input/ProjectItem';

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
      selectedIndex,
      addInputRef,
      onItemFocus,
      onItemTextChange,
      onSubmitEditing,
      onToggleExpand,
    } = this.props;
    const metaData = item.item.data;
    const task = itemsById.get(metaData.get('id'));
    const taskId = task.get('id');
    const autoFocus = selectedIndex && item.index === selectedIndex;

    return (
      <ProjectItem
        indent={metaData.get('indent')}
        hasChildren={metaData.get('hasChildren')}
        expanded={metaData.get('expanded')}
        value={task.get('title')}
        multiline={true}
        scrollEnabled={false}
        blurOnSubmit={false}
        onChangeText={text => {
          onItemTextChange(text, taskId);
        }}
        inputRef={ref => {
          addInputRef(ref, taskId);
          if (autoFocus && ref) {
            ref.focus();
          }
        }}
        onFocus={() => {
          onItemFocus(taskId);
        }}
        onSubmitEditing={e => {
          onSubmitEditing(e);
        }}
        onToggleExpand={() => {
          onToggleExpand(taskId);
        }}
      />
    );
  }
  render() {
    const { visibleOrder } = this.props;

    return (
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
    );
  }
}
