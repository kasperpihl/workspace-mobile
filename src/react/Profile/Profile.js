import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import storeGet from 'swipes-core-js/utils/store/storeGet';
import SW from './Profile.swiss';

export default class Profile extends PureComponent {
  handleLogOut() {
    const store = storeGet();

    request('user.signout', {}).then(res => {
      console.log(res);
      if (res.ok === false) {
        Alert.alert(
          'Error',
          'Something went wrong. Try again later.',
          [{ text: 'OK' }],
          {
            cancelable: false,
          }
        );
      } else {
        store.dispatch({ type: 'RESET_STATE' });
      }
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Profile</SW.HeaderText>
        <SW.ButtonWrapper onPress={this.handleLogOut}>
          <SW.Button>Log out</SW.Button>
        </SW.ButtonWrapper>
      </SW.Wrapper>
    );
  }
}
