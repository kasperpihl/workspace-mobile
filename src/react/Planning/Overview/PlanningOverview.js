import React from 'react';
// import { connect } from 'react-redux';
import SW from './PlanningOverview.swiss';

export default function PlanningOverview(props) {
  return (
    <SW.Wrapper>
      <SW.HeaderText numberOfLines={1}>Planning</SW.HeaderText>
    </SW.Wrapper>
  );
}

// export default connect(state => ({
//   myId: state.me.get('user_id'),
// }))(ChatOverview);
