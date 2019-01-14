import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import { goSignUp, goHome, goForgottenPassword } from 'src/navigation';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import SW from 'src/react/SignIn/SignIn.swiss';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      passwordVal: '',
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleSignIn() {
    const { emailVal, passwordVal } = this.state;

    request('user.signin', {
      email: emailVal,
      password: passwordVal,
    }).then(res => {
      if (res.ok === false) {
        Alert.alert('Wrong email or password', '', [{ text: 'OK' }], {
          cancelable: false,
        });
      }
    });
  }
  render() {
    const { signedIn } = this.props;

    if (signedIn) {
      goHome();
      return null;
    }

    const { emailVal, passwordVal } = this.state;

    return (
      <SW.Wrapper>
        <SW.HeaderText>Swipes</SW.HeaderText>
        <SW.FormWrapper>
          <Input
            value={emailVal}
            onChangeText={this.handleChangeText('emailVal')}
            label={'Email'}
            textContentType={'username'}
          />
          <View style={{ marginTop: 30 }}>
            <Input
              value={passwordVal}
              onChangeText={this.handleChangeText('passwordVal')}
              label={'Password'}
              textContentType={'password'}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: 80 }}>
            <FormButton onPress={this.handleSignIn} label={'Sign in'} />
            <Button
              onPress={() => {
                goForgottenPassword();
              }}
              title="Forgot your password?"
            />
          </View>
        </SW.FormWrapper>
        <View style={{ marginTop: 150 }}>
          <SW.DontHaveAnAccountText>
            {`Don't have an account?`}
          </SW.DontHaveAnAccountText>
          <Button
            onPress={() => {
              goSignUp();
            }}
            title="Sign up"
          />
        </View>
      </SW.Wrapper>
    );
  }
}
