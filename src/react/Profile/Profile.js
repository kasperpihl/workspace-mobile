import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import storeGet from 'swipes-core-js/utils/store/storeGet';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from './Profile.swiss';

export default class Profile extends PureComponent {
  requestLogOut = () => {
    const store = storeGet();

    request('user.signout', {}).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
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
