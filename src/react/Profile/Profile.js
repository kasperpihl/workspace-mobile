import React from 'react';
import { Alert } from 'react-native';
import request from 'core/utils/request';
import storeGet from 'core/utils/store/storeGet';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import SW from './Profile.swiss';

// export default connect(state => ({
//   teams: state.teams,
// }))(ProjectOverview);

export default function Profile(props) {
  const requestLogOut = () => {
    const store = storeGet();

    request('user.signout', {}).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      } else {
        store.dispatch({ type: 'RESET_STATE' });
      }
    });
  };
  const handleLogOut = () => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: requestLogOut },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <SW.Wrapper>
      {/* <AssigneeImage
      userId={userId}
      teamId={teamId}
      size={100}
      imageSize={128}
    /> */}
      <SW.HeaderText>Profile</SW.HeaderText>
      <SW.ButtonWrapper onPress={handleLogOut}>
        <SW.Button>Log out</SW.Button>
      </SW.ButtonWrapper>
    </SW.Wrapper>
  );
}
