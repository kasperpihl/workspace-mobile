import React, { PureComponent } from 'react';
import { Button, View, KeyboardAvoidingView } from 'react-native';
import request from 'swipes-core-js/utils/request';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from 'src/react/SignUp/SignUp.swiss';

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
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      }
    });
  };
  render() {
    const { firstnameVal, lastnameVal } = this.state;

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
                <FormLabel label={'First name'} />
                <FormTextInput
                  value={firstnameVal}
                  onChangeText={this.handleChangeText('firstnameVal')}
                />
              </View>
              <View>
                <FormLabel label={'Last name'} />
                <FormTextInput
                  last
                  value={lastnameVal}
                  onChangeText={this.handleChangeText('lastnameVal')}
                  onSubmitEditing={this.handleSignUp}
                />
              </View>
              <View>
                <FormButton
                  onPress={this.handleSignUp}
                  label={`Let's get started`}
                />
              </View>
            </Form>
          </SW.FormWrapper>
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
      </KeyboardAvoidingView>
    );
  }
}
