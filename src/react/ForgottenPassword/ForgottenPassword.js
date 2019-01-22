import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import { goSignIn } from 'src/navigation';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from './ForgottenPassword.swiss';

export default class ForgottenPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
    };
    this.handleSendResetEmail = this.handleSendResetEmail.bind(this);
  }
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleSendResetEmail() {
    const { emailVal } = this.state;

    request('user.sendResetEmail', {
      email: emailVal,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      } else {
        Alert.alert(
          'Success',
          'Check your email for instructions to reset your password',
          [
            {
              text: 'OK',
              onPress: () => {
                goSignIn();
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Forgot password?</SW.HeaderText>
        <SW.CopyText>
          {`Enter you email and we'll send you an email to reset your password.`}
        </SW.CopyText>
        <SW.FormWrapper>
          <Input
            label={'Email'}
            textContentType={'username'}
            onChangeText={this.handleChangeText('emailVal')}
          />
          <View style={{ marginTop: 80 }}>
            <FormButton
              label={'Reset password'}
              onPress={this.handleSendResetEmail}
            />
            <Button
              onPress={() => {
                goSignIn();
              }}
              title="Cancel"
            />
          </View>
        </SW.FormWrapper>
      </SW.Wrapper>
    );
  }
}
