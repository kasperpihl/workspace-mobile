import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SW from './InitLoading.swiss';

const InitLoading = ({ lastConnect, requireAuth, children }) => {
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
  lastConnect: state.connection.get('lastConnect'),
  token: state.auth.get('token'),
}))(InitLoading);
