import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { goSignIn, goHome } from './navigation';

@connect(state => ({
  token: state.auth.get('token'),
}))
export default class Redirecter extends PureComponent {
  componentDidMount() {
    this.checkForRedirect();
  }
  componentDidUpdate() {
    this.checkForRedirect();
  }
  checkForRedirect() {
    const { token, requireAuth } = this.props;
    if (requireAuth && !token) {
      goSignIn();
    } else if (!requireAuth && token) {
      goHome();
    }
  }
  render() {
    return this.props.children;
  }
}
