import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import LogoHeader from 'src/react/LogoHeader/LogoHeader';
import TextButton from 'src/react/TextButton/TextButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import validateEmail from 'src/utils/validateEmail';
import withKeyboard from 'src/utils/withKeyboard';
import SW from 'src/react/SignUp/SignUp.swiss';

@withKeyboard
export default class SignUpStepOne extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      passwordVal: '',
    };
  }
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  goToNextStep = () => {
    const { emailVal, passwordVal } = this.state;

    if (!validateEmail(emailVal)) {
      return alertErrorHandler(null, 'Ivalid email');
    }

    if (passwordVal.length === 0) {
      return alertErrorHandler(null, 'Ivalid password');
    }

    Navigation.push(this.props.componentId, {
      component: {
        name: 'SignUpStepTwo',
        passProps: {
          email: emailVal,
          password: passwordVal,
        },
      },
    });
  };
  render() {
    const { keyboardIsShown } = this.props;
    const { emailVal, passwordVal } = this.state;
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
              height: '100%',
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
                  passwordField={true}
                  onChangeText={this.handleChangeText('passwordVal')}
                  onSubmitEditing={this.goToNextStep}
                />
              </View>
              <View>
                <FormButton
                  onPress={this.goToNextStep}
                  label={'Create account'}
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
