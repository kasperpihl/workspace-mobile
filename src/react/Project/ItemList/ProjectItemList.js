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
      selectedIndex,
      selectionStart,
      addInputRef,
      onItemFocus,
      onItemTextChange,
      onSubmitEditing,
      onSelectionChange,
    } = this.props;
    const metaData = item.item.data;
    const task = itemsById.get(metaData.get('id'));
    const autoFocus = selectedIndex && item.index === selectedIndex;
    // const selection = {
    //   start: selectionStart > 0 ? selectionStart : 0,
    //   end: selectionStart > 0 ? selectionStart : 0,
    // };
    // console.log(selection, 'selection');

    return (
      <ProjectInput
        indent={metaData.get('indent')}
        value={task.get('title')}
        multiline={true}
        // selection={selection}
        onChangeText={text => {
          onItemTextChange(text, task.get('id'));
        }}
        inputRef={ref => {
          addInputRef(ref, task.get('id'));
          if (autoFocus && ref) {
            ref.focus();
          }
        }}
        onFocus={() => {
          onItemFocus(task.get('id'));
        }}
        onSubmitEditing={e => {
          onSubmitEditing(e);
        }}
        onSelectionChange={e => {
          onSelectionChange(e);
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
