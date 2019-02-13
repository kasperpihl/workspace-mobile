import React, { Component } from 'react';
import { Button, View, KeyboardAvoidingView } from 'react-native';
import request from 'swipes-core-js/utils/request';
import { goSignUp, goHome, goForgottenPassword } from 'src/navigation';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import { Form, FormTextInput } from 'src/react/Form/Form';
import alertErrorHandler from 'src/utils/alertErrorHandler';
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
        alertErrorHandler(res, 'Wrong email or password');
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
      <KeyboardAvoidingView behavior="padding">
        <SW.Wrapper>
          <SW.HeaderTextWrapper>
            <SW.HeaderText>Swipes</SW.HeaderText>
          </SW.HeaderTextWrapper>
          <SW.FormWrapper>
            <Form
              style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                flex: 1,
              }}
            >
              <View>
                <FormLabel label={'Email'} />
                <FormTextInput
                  value={emailVal}
                  onChangeText={this.handleChangeText('emailVal')}
                />
              </View>
              <View>
                <FormLabel label={'Password'} />
                <FormTextInput
                  last
                  value={passwordVal}
                  onChangeText={this.handleChangeText('passwordVal')}
                  passwordField={true}
                  onSubmitEditing={this.handleSignIn}
                />
              </View>
              <View>
                <FormButton onPress={this.handleSignIn} label={'Sign in'} />
                <Button
                  onPress={() => {
                    goForgottenPassword();
                  }}
                  title="Forgot your password?"
                />
              </View>
            </Form>
          </SW.FormWrapper>
          <SW.FooterWrapper>
            <SW.FooterText>{`Don't have an account?`}</SW.FooterText>
            <Button
              onPress={() => {
                goSignUp();
              }}
              title="Sign up"
            />
          </SW.FooterWrapper>
        </SW.Wrapper>
      </KeyboardAvoidingView>
    );
  }
}
