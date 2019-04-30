import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import OneSignal from 'react-native-onesignal';
import request from 'core/utils/request';
import { goSignUp, goHome, goForgottenPassword } from 'src/navigation';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import LogoHeader from 'src/react/LogoHeader/LogoHeader';
import TextButton from 'src/react/TextButton/TextButton';
import { Form, FormTextInput } from 'src/react/Form/Form';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import SW from 'src/react/SignIn/SignIn.swiss';

@withKeyboard
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
      } else {
        const myId = res.user_id;
        OneSignal.getTags(receivedTags => {
          if (!receivedTags) {
            receivedTags = {};
          }

          if (myId && !receivedTags.swipesUserId) {
            OneSignal.sendTag('swipesUserId', myId);
          } else if (
            receivedTags.swipesUserId &&
            myId !== receivedTags.swipesUserId
          ) {
            OneSignal.sendTag('swipesUserId', myId);
          }
        });
      }
    });
  }
  render() {
    const { signedIn, keyboardIsShown } = this.props;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    if (signedIn) {
      goHome();
      return null;
    }

    const { emailVal, passwordVal } = this.state;

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <SW.Wrapper>
          {!keyboardIsShown && <LogoHeader subtitle={'Log In'} />}
          <KeyboardAvoidingView
            style={{
              width: '100%',
              flex: 1.7,
            }}
            behavior={behavior}
          >
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
                <FormButton onPress={this.handleSignIn} label={'Log In'} />
              </View>
            </Form>
            <SW.ForgotPasswordWrapper
              onPress={() => {
                goForgottenPassword();
              }}
            >
              <SW.ForgotPasswordText>FORGOT PASSWORD?</SW.ForgotPasswordText>
            </SW.ForgotPasswordWrapper>
          </KeyboardAvoidingView>
          <SW.FooterWrapper>
            <SW.FooterText>{`Don't have an account?`}</SW.FooterText>
            <TextButton
              onPress={() => {
                goSignUp();
              }}
              forwardButton={true}
              title="SIGN UP"
              textType="captionDark"
              height="auto"
            />
          </SW.FooterWrapper>
        </SW.Wrapper>
      </ScrollView>
    );
  }
}
