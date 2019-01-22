import React, { Component } from 'react';
import { Button, View, Alert } from 'react-native';
import request from 'swipes-core-js/utils/request';
import { goSignIn } from 'src/navigation';
import Input from 'src/react/Input/Input';
import FormButton from 'src/react/FormButton/FormButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from 'src/react/SignUp/SignUp.swiss';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: '',
      passwordVal: '',
      firstnameVal: '',
      lastnameVal: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleSignUp() {
    const { emailVal, passwordVal, firstnameVal, lastnameVal } = this.state;

    request('user.signup', {
      email: emailVal,
      password: passwordVal,
      first_name: firstnameVal,
      last_name: lastnameVal,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      }
    });
  }
  render() {
    return (
      <SW.Wrapper>
        <SW.HeaderText>Swipes</SW.HeaderText>
        <SW.FormWrapper>
          <Input
            label={'Email'}
            onChangeText={this.handleChangeText('emailVal')}
          />
          <View style={{ marginTop: 30 }}>
            <Input
              label={'First name'}
              onChangeText={this.handleChangeText('firstnameVal')}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Input
              label={'Last name'}
              onChangeText={this.handleChangeText('lastnameVal')}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Input
              label={'Password'}
              textContentType={'password'}
              secureTextEntry={true}
              onChangeText={this.handleChangeText('passwordVal')}
            />
          </View>
          <View style={{ marginTop: 80 }}>
            <FormButton onPress={this.handleSignUp} label={'Create account'} />
          </View>
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
