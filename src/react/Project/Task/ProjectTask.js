import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './ProjectTask.swiss';
import withProjectTask from 'swipes-core-js/components/project/withProjectTask';

@withProjectTask
export default class ProjectTask extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
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
    // Removing new lines is the only way that I found to simulate
    // single line input with multiline set to true
    stateManager.editHandler.updateTitle(taskId, text.replace('\n', ''));
  };
  handleExpandPress = () => {
    const { stateManager, taskId, expanded } = this.props;
    stateManager.expandHandler[expanded ? 'collapse' : 'expand'](taskId);
  };
  handleSubmitEditing = e => {
    const { stateManager, taskId } = this.props;
    stateManager.editHandler.enter(taskId, e.target.selectionStart);
  };
  checkFocus = () => {
    const { isSelected, selectionStart, title } = this.props;
    const { isFocused } = this.state;
    if (isSelected && !isFocused) {
      this.inputRef.focus();
      if (typeof selectionStart === 'number') {
        const selI = Math.min(title.length, selectionStart);

        this.inputRef.setSelectionRange(selI, selI);
      }
    } else if (!isSelected && isFocused) {
      this.inputRef.blur();
    }
  };
  render() {
    const {
      title,
      isSelected,
      selectionStart,
      indention,
      completion,
      hasChildren,
      expanded,

      inputRef,
      rangeToHighlight,
      indentToHightlight,
      taskId,
      ...rest
    } = this.props;
    console.log(taskId, title);

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
          <SW.Circle />
          <SW.Input
            innerRef={c => (this.inputRef = c)}
            value={title}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onSubmitEditing={this.handleSubmitEditing}
            onChangeText={this.handleChangeText}
            multiline={true}
            scrollEnabled={false}
            blurOnSubmit={false}
            {...rest}
          />
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
