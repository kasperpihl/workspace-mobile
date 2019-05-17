import React from 'react';
import { Alert } from 'react-native';
import OneSignal from 'react-native-onesignal';
import request from 'core/utils/request';
import storeGet from 'core/utils/store/storeGet';
import userGetFullName from 'core/utils/user/userGetFullName';
import userGet from 'core/utils/user/userGet';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import TextButton from 'src/react/TextButton/TextButton';
import SW from './Profile.swiss';

export default function Profile(props) {
  const requestLogOut = () => {
    const store = storeGet();

    request('user.signout', {}).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      } else {
        store.dispatch({ type: 'RESET_STATE' });
        OneSignal.deleteTag('swipesUserId');
        window.analytics.sendEvent('Logged out');
        window.analytics.logout();
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
  const user = userGet('me').toJS();

  return (
    <SW.Wrapper>
      <SW.InfoWrapper>
        <AssigneeImage userId={'me'} size={100} imageSize={128} />
        <SW.HeaderText>{userGetFullName('me')}</SW.HeaderText>
        <SW.Email>{user.email}</SW.Email>
      </SW.InfoWrapper>
      <SW.ButtonWrapper>
        <TextButton
          onPress={handleLogOut}
          buttonIcon={true}
          icon="LogOut"
          title="Log out"
          textType="bodyBold"
        />
      </SW.ButtonWrapper>
    </SW.Wrapper>
  );
}
