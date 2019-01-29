import React, { PureComponent } from 'react';
import { Button, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import validateEmail from 'src/utils/validateEmail';
import SW from 'src/react/SignUp/SignUp.swiss';

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
    return (
      <SW.Wrapper>
        <SW.HeaderText>Swipes</SW.HeaderText>
        <SW.FormWrapper>
          <Form>
            <FormLabel label={'Email'} />
            <FormTextInput onChangeText={this.handleChangeText('emailVal')} />
            <View style={{ marginTop: 30 }}>
              <FormLabel label={'Password'} />
              <FormTextInput
                last
                textContentType={'password'}
                secureTextEntry={true}
                onChangeText={this.handleChangeText('passwordVal')}
                onSubmitEditing={this.goToNextStep}
              />
            </View>
            <View style={{ marginTop: 80 }}>
              <FormButton
                onPress={this.goToNextStep}
                label={'Create account'}
              />
            </View>
          </Form>
        </SW.FormWrapper>
        <View style={{ marginTop: 100 }}>
          <SW.DontHaveAnAccountText>
            {`Already have an account?`}
          </SW.DontHaveAnAccountText>
          <Button
            onPress={() => {
              goSignIn();
            }}
            title="Sign In"
          />
        </View>
      </SW.Wrapper>
    );
  }
}
