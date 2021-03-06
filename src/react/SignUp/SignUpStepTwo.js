import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import request from 'core/utils/request';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import LogoHeader from 'src/react/LogoHeader/LogoHeader';
import TextButton from 'src/react/TextButton/TextButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import oneSignalTag from 'src/utils/oneSignalTag';
import SW from 'src/react/SignUp/SignUp.swiss';

@withKeyboard
export default class SignUpStepTwo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstnameVal: '',
      lastnameVal: '',
    };
  }
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleSignUp = () => {
    const { email, password } = this.props;
    const { firstnameVal, lastnameVal } = this.state;

    request('user.signup', {
      email,
      password,
      first_name: firstnameVal,
      last_name: lastnameVal,
      timezone_offset: new Date().getTimezoneOffset(),
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      } else {
        oneSignalTag(res.user_id);
        window.analytics.sendEvent('Signed up', { email });
      }
    });
  };
  render() {
    const { keyboardIsShown } = this.props;
    const { firstnameVal, lastnameVal } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <SW.Wrapper>
          {!keyboardIsShown && <LogoHeader subtitle={'Create Account'} />}
          <KeyboardAvoidingView
            style={{
              width: '100%',
              flex: 1,
            }}
            behavior={behavior}
          >
            <Form
              style={{
                flexDirection: 'column',
              }}
            >
              <View>
                <FormLabel label={'First name'} />
                <FormTextInput
                  autoFocus={true}
                  value={firstnameVal}
                  onChangeText={this.handleChangeText('firstnameVal')}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <FormLabel label={'Last name'} />
                <FormTextInput
                  last
                  value={lastnameVal}
                  onChangeText={this.handleChangeText('lastnameVal')}
                  onSubmitEditing={this.handleSignUp}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <FormButton
                  onPress={this.handleSignUp}
                  label={`Let's get started`}
                />
              </View>
            </Form>
          </KeyboardAvoidingView>
          <SW.FooterWrapper>
            <SW.FooterText>{`Already have an account?`}</SW.FooterText>
            <TextButton
              onPress={() => {
                goSignIn();
              }}
              forwardButton={true}
              title="SIGN IN"
              textType="captionDark"
              height="auto"
            />
          </SW.FooterWrapper>
        </SW.Wrapper>
      </ScrollView>
    );
  }
}
