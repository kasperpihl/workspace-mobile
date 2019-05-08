import React from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { connect } from 'react-redux';
import FormButton from 'src/react/FormButton/FormButton';
import SW from './InitLoading.swiss';

const InitLoading = ({
  clientUpdate,
  maintenance,
  lastConnect,
  requireAuth,
  children,
}) => {
  const openDownloadUrl = () => {
    const downloadUrl = clientUpdate.get('url');
    Linking.openURL(downloadUrl);
  };

  //T_TODO support for maintenance
  if (clientUpdate) {
    return (
      <SW.Wrapper>
        <SW.TextContainer>
          <SW.Title>New Update</SW.Title>
          <SW.Subtitle>
            Please download the newest update of Swipes for Teams in order to
            use it.
          </SW.Subtitle>
          <SW.ButtonWrapper>
            <FormButton onPress={openDownloadUrl} label={'Download'} />
          </SW.ButtonWrapper>
        </SW.TextContainer>
      </SW.Wrapper>
    );
  }

  if (lastConnect !== null || !requireAuth) {
    return children;
  } else {
    return (
      <SW.Wrapper>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
    );
  }
};

export default connect(state => ({
  clientUpdate: state.connection.get('clientUpdate'),
  maintenance: state.connection.get('maintenance'),
  lastConnect: state.connection.get('lastConnect'),
  token: state.auth.get('token'),
}))(InitLoading);
