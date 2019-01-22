import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import storeGet from 'swipes-core-js/utils/store/storeGet';
import SW from './Profile.swiss';

export default class Profile extends PureComponent {
  requestLogOut = () => {
    const store = storeGet();

    request('user.signout', {}).then(res => {
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
  };
  handleLogOut = () => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.requestLogOut },
      ],
      {
        cancelable: false,
      }
    );
  };
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
