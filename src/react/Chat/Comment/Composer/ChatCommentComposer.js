import React from 'react';
import SW from './ChatCommentComposer.swiss';

export default function ChatCommentComposer(props) {
  return (
    <SW.Wrapper>
      <SW.InputWrapper>
        <SW.Input multiline />
      </SW.InputWrapper>
      <SW.IconWrapper />
    </SW.Wrapper>
  );
}

// export default connect(state => ({
//   myId: state.me.get('user_id'),
// }))(ChatOverview);
