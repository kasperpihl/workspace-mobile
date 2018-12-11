import React, { PureComponent } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from 'src/react/Project/Input/ProjectItem.swiss';

export default class ProjectInput extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      inputRef,
      indent,
      hasChildren,
      expanded,
      onToggleExpand,
      rangeToHighlight,
      indentToHightlight,
      taskId,
      ...rest
    } = this.props;

    return (
      <SW.Wrapper>
        {hasChildren && (
          <IconTouchableWrapper
            icon={'expand'}
            fill={'sw2'}
            width="18"
            height="8"
            rotate={expanded ? '0' : '-90'}
            onPress={onToggleExpand}
          />
        )}
        <SW.MarginForExpandArrow hasChildren={hasChildren} />
        {[...Array(indent)].map((v, i) => {
          const hightlihgt =
            rangeToHighlight.includes(taskId) && indentToHightlight === i + 1;
          return (
            <SW.IndentSpace
              key={`${indent}-${taskId}-${i}`}
              hightlihgt={hightlihgt}
              indent={indent}
            />
          );
        })}
        <SW.InnerWrapper>
          <SW.Circle />
          <SW.Input innerRef={inputRef} {...rest} />
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
