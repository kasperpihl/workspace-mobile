import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, SafeAreaView, View } from 'react-native';
import { goSignUp, goHome, goForgottenPassword } from 'src/navigation';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import SW from 'src/react/SignIn/SignIn.swiss';
import * as apiActions from 'swipes-core-js/actions/api';

@connect(
  null,
  {
    request: apiActions.request,
  }
)
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
    const { request } = this.props;
    const { emailVal, passwordVal } = this.state;
    request('user.signin', {
      email: emailVal,
      password: passwordVal,
    }).then(res => {
      console.log(res);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
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
      </SafeAreaView>
    );
  }
}
