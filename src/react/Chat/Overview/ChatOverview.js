import React from 'react';
import { connect } from 'react-redux';
import SW from './ChatOverview.swiss';

function ChatOverview(props) {
  // const [type, setType] = useState('following');

  console.log(props);
  return (
    <SW.Wrapper>
      <SW.HeaderText>Discussions</SW.HeaderText>
      {/* <ChatList myId={myId} key={type} type={type} /> */}
    </SW.Wrapper>
  );
}

export default connect(state => ({
  myId: state.me.get('user_id'),
}))(ChatOverview);
