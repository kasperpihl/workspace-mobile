import React, { Component } from 'react';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from 'src/react/Project/Input/ProjectItem.swiss';

export default class ProjectInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { inputRef, indent, hasChildren, expanded, ...rest } = this.props;
    return (
      <SW.Wrapper>
        {hasChildren && (
          <IconTouchableWrapper
            name={'expand'}
            fill={'sw2'}
            width="18"
            height="8"
            rotate={expanded ? '0' : '-90'}
          />
        )}
        <SW.InnerWrapper indent={indent} hasChildren={hasChildren}>
          <SW.Circle />
          <SW.Input innerRef={inputRef} {...rest} />
        </SW.InnerWrapper>
      </SW.Wrapper>
    );
  }
}
