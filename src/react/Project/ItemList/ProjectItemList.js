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
      addInputRef,
      onItemFocus,
      onItemTextChange,
      onSubmitEditing,
    } = this.props;
    const metaData = item.item.data;
    const task = itemsById.get(metaData.get('id'));
    const autoFocus = selectedIndex && item.index === selectedIndex;

    return (
      <ProjectInput
        indent={metaData.get('indent')}
        value={task.get('title')}
        multiline={true}
        blurOnSubmit={false}
        onChangeText={text => {
          onItemTextChange(text, task.get('id'));
        }}
        inputRef={ref => {
          addInputRef(ref, task.get('id'));
          if (autoFocus && ref) {
            // We need that hack with the setTimeout
            // in order for the KeyboardManager package to work
            // properly when we are creating new inputs at the end
            // of the list. If we focus too early the KeyboardManager does
            // not scroll correctly and the input is left below the keyboard
            setTimeout(() => {
              ref.focus();
            }, 0);
          }
        }}
        onFocus={() => {
          onItemFocus(task.get('id'));
        }}
        onSubmitEditing={e => {
          onSubmitEditing(e);
        }}
      />
    );
  }
  render() {
    const { visibleOrder } = this.props;

    return (
      <VirtualizedList
        contentInset={{ top: 0, left: 0, bottom: 250, right: 0 }}
        style={{ backgroundColor: 'red' }}
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
