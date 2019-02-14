import React, { PureComponent } from 'react';
import { Button, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
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
      <SW.Wrapper>
        {!keyboardIsShown && (
          <SW.HeaderTextWrapper>
            <SW.HeaderText>Swipes</SW.HeaderText>
          </SW.HeaderTextWrapper>
        )}
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
          <Button
            onPress={() => {
              goSignIn();
            }}
            title="Sign In"
          />
        </SW.FooterWrapper>
      </SW.Wrapper>
    );
  }
}
