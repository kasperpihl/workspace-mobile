import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import Icon from 'src/react/Icon/Icon';
import SW from './ProjectTask.swiss';
import withProjectTask from 'core/react/_hocs/Project/withProjectTask';
import colors from 'src/utils/colors';

@withProjectTask
export default class ProjectTask extends PureComponent {
  state = {
    isFocused: false,
  };
  selection = {
    start: 0,
    end: 0,
  };
  componentDidMount() {
    this.checkFocus();
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    this.checkFocus();
    return null;
  }
  componentDidUpdate() {
    this.checkFocus();
  }
  handleFocus = () => {
    const { taskId, stateManager } = this.props;
    stateManager.selectHandler.select(taskId);
    this.setState({ isFocused: true });
  };
  handleBlur = () => {
    const { stateManager, taskId } = this.props;
    stateManager.selectHandler.deselect(taskId);
    this.setState({ isFocused: false });
  };
  handleChangeText = text => {
    const { taskId, stateManager } = this.props;

    if (this.blockNextTextChange) {
      this.blockNextTextChange = undefined;
      return;
    }
    // Removing new lines is the only way that I found to simulate
    // single line input with multiline set to true
    stateManager.editHandler.updateTitle(taskId, text.replace('\n', ''));
  };
  handleExpandPress = () => {
    const { stateManager, taskId, task } = this.props;
    const { expanded } = task;

    stateManager.expandHandler[expanded ? 'collapse' : 'expand'](taskId);
  };
  handleKeyPress = e => {
    const { stateManager, taskId } = this.props;

    if (e.nativeEvent.key === 'Backspace' && this.selection.start === 0) {
      stateManager.editHandler.delete(taskId);
    }
  };
  handleSubmit = e => {
    const { stateManager, taskId } = this.props;
    stateManager.editHandler.enter(taskId, this.selection.start);
  };
  handleComplete = () => {
    const { taskId, stateManager, task } = this.props;
    const { completion } = task;

    if (completion) {
      stateManager.completeHandler.incomplete(taskId);
    } else {
      stateManager.completeHandler.complete(taskId);
    }
  };
  handleSelectionChange = e => {
    this.selection = e.nativeEvent.selection;
  };
  checkFocus = () => {
    const { task } = this.props;
    const { isSelected, selectionStart, title } = task;
    const { isFocused } = this.state;

    if (isSelected && !isFocused) {
      if (typeof selectionStart === 'number') {
        const selI = Math.min(title.length, selectionStart);
        const selection = { start: selI, end: selI };

        this.inputRef.setNativeProps({ selection });
        this.selection = selection;
      }
      this.inputRef.focus();
    }
  };
  render() {
    const { taskId, task, disabled } = this.props;
    const {
      title,
      indention,
      hasChildren,
      expanded,
      completion,
      isSelected,
    } = task;

    return (
      <SW.Wrapper>
        {hasChildren && (
          <IconTouchableWrapper
            icon={expanded ? 'ArrowDown' : 'ArrowRight'}
            fill={'sw2'}
            onPress={this.handleExpandPress}
            small={true}
            style={{ marginTop: -10 }}
          />
        )}
        <SW.MarginForExpandArrow hasChildren={hasChildren} />
        {[...Array(indention)].map((v, i) => {
          // const highlight = rangeToHighlight.includes(taskId) && indentToHightlight === i + 1;
          return (
            <SW.IndentSpace
              key={`${indention}-${taskId}-${i}`}
              // highlight={highlight}
              indent={indention}
            />
          );
        })}
        <SW.InnerWrapper>
          <SW.CircleWrapper onPress={this.handleComplete}>
            <SW.Circle completion={completion}>
              {completion && (
                <Icon
                  name="Check"
                  fill={colors['base']}
                  width={20}
                  height={20}
                />
              )}
            </SW.Circle>
          </SW.CircleWrapper>
          <SW.Input
            innerRef={c => (this.inputRef = c)}
            value={title}
            autoFocus={isSelected}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            onSelectionChange={this.handleSelectionChange}
            onChangeText={this.handleChangeText}
            multiline={true}
            scrollEnabled={false}
            blurOnSubmit={false}
            onSubmitEditing={this.handleSubmit}
            editable={disabled ? false : true}
          />
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
