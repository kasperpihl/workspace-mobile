import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import Icon from 'src/react/Icon/Icon';
import SW from './ProjectTask.swiss';
import withProjectTask from 'swipes-core-js/components/project/withProjectTask';

@withProjectTask
export default class ProjectTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
    this.selection = {
      start: 0,
      end: 0,
    };
  }
  componentDidMount() {
    // Wait for sibling components to have re-rendered
    setTimeout(this.checkFocus, 0);
  }
  componentDidUpdate() {
    // Wait for all components to have re-rendered
    setTimeout(this.checkFocus, 0);
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
    } else if (e.nativeEvent.key === 'Enter') {
      this.blockNextTextChange = true;
      stateManager.editHandler.enter(taskId, this.selection.start);
    }
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
    if (this.blockNextSelectionChange) {
      this.blockNextSelectionChange = undefined;

      return;
    }

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
        this.blockNextSelectionChange = true;
      }
      this.inputRef.focus();
    } else if (!isSelected && isFocused) {
      this.inputRef.blur();
    }
  };
  render() {
    const { taskId, task } = this.props;
    const { title, indention, hasChildren, expanded, completion } = task;

    return null;

    return (
      <SW.Wrapper>
        {hasChildren && (
          <IconTouchableWrapper
            icon={'expand'}
            fill={'sw2'}
            width="18"
            height="8"
            rotate={expanded ? '0' : '-90'}
            onPress={this.handleExpandPress}
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
                <Icon name="check" fill="white" width={15} height={10} />
              )}
            </SW.Circle>
          </SW.CircleWrapper>
          <SW.Input
            innerRef={c => (this.inputRef = c)}
            value={title}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyPress={this.handleKeyPress}
            onSelectionChange={this.handleSelectionChange}
            onChangeText={this.handleChangeText}
            multiline={true}
            scrollEnabled={false}
          />
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
