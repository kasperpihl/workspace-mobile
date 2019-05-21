import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import Icon from 'src/react/Icon/Icon';
import SW from './ProjectTask.swiss';
import withProjectTask from 'core/react/_hocs/Project/withProjectTask';
import viewAttachment from 'src/utils/viewAttachment';

@withProjectTask
export default class ProjectTask extends PureComponent {
  state = {
    isFocused: false,
    editAttachment: false,
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
    this.setState({ isFocused: true, editAttachment: true });
  };
  handleBlur = () => {
    const { stateManager, taskId } = this.props;
    stateManager.selectHandler.deselect(taskId);
    this.setState({ isFocused: false, editAttachment: false });
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

    this.setState({
      editAttachment: false,
    });
    stateManager.editHandler.enter(taskId, this.selection.start);
  };
  handleComplete = () => {
    const { taskId, stateManager, task, planning } = this.props;
    const { completion } = task;
    const eventName = completion ? 'Task incompleted' : 'Task completed';
    const fromView = planning ? 'Planing' : 'Project';

    window.analytics.sendEvent(
      eventName,
      stateManager.getClientState().get('owned_by'),
      {
        From: fromView,
      }
    );

    if (completion) {
      stateManager.completeHandler.incomplete(taskId);
    } else {
      stateManager.completeHandler.complete(taskId);
    }
  };
  handleSelectionChange = e => {
    this.selection = e.nativeEvent.selection;
  };
  handleEditAttachment = e => {
    const { taskId, stateManager } = this.props;
    this.setState({
      editAttachment: true,
    });
    stateManager.selectHandler.select(taskId);
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
    let { editAttachment } = this.state;
    const { taskId, task, disabled, stateManager } = this.props;
    const {
      title,
      indention,
      hasChildren,
      expanded,
      completion,
      isSelected,
    } = task;
    const attachment =
      stateManager
        .getClientState()
        .getIn(['tasks_by_id', taskId, 'attachment']) || null;
    const indentComp =
      stateManager.getLocalState().getIn(['indentComp', taskId]) || 0;
    const finalIndention = indention - indentComp;
    const attachmentType = attachment ? attachment.get('type') : null;
    const attachmentTitle = attachment ? attachment.get('title') : null;

    editAttachment = isSelected || editAttachment;

    let icon;
    switch (attachmentType) {
      case 'url':
        icon = 'Link';
        break;
      case 'note':
        icon = 'Note';
        break;
      case 'file':
        icon = 'File';
    }

    return (
      <SW.Wrapper>
        {hasChildren && (
          <IconTouchableWrapper
            icon={expanded ? 'ArrowDown' : 'ArrowRight'}
            fill={'sw3'}
            onPress={this.handleExpandPress}
            arrow={true}
            style={{ marginTop: -13 }}
          />
        )}
        <SW.MarginForExpandArrow hasChildren={hasChildren} />
        {[...Array(finalIndention)].map((v, i) => {
          // const highlight = rangeToHighlight.includes(taskId) && indentToHightlight === i + 1;
          return (
            <SW.IndentSpace
              key={`${indention}-${taskId}-${i}`}
              // highlight={highlight}
              indent={finalIndention}
            />
          );
        })}
        <SW.InnerWrapper>
          {!attachment && (
            <SW.CircleWrapper onPress={this.handleComplete}>
              <SW.Circle completion={completion}>
                {completion && (
                  <Icon name="Check" fill="base" width={20} height={20} />
                )}
              </SW.Circle>
            </SW.CircleWrapper>
          )}
          {attachment && (
            <SW.IconWrapper>
              <Icon name={icon} fill="dark" />
            </SW.IconWrapper>
          )}
          {(!attachment || editAttachment) && (
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
              maxLength={255}
            />
          )}
          {attachment && !editAttachment && (
            <SW.AttachmentTitleWrapper
              onLongPress={() => {
                this.handleEditAttachment();
              }}
              onPress={() => {
                viewAttachment(attachment.toJS());
              }}
            >
              <SW.AttachmentTitle>{attachmentTitle}</SW.AttachmentTitle>
            </SW.AttachmentTitleWrapper>
          )}
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
