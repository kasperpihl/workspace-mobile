import React, { PureComponent } from 'react';
import { View } from 'react-native';
import request from 'swipes-core-js/utils/request';
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
    return (
      <SW.Wrapper>
        <SW.HeaderText>Swipes</SW.HeaderText>
        <SW.FormWrapper>
          <Form>
            <FormLabel label={'First name'} />
            <FormTextInput
              onChangeText={this.handleChangeText('firstnameVal')}
            />
            <View style={{ marginTop: 30 }}>
              <FormLabel label={'Last name'} />
              <FormTextInput
                onChangeText={this.handleChangeText('lastnameVal')}
              />
            </View>
            <View style={{ marginTop: 80 }}>
              <FormButton
                onPress={this.handleSignUp}
                label={`Let's get started`}
              />
            </View>
          </Form>
        </SW.FormWrapper>
      </SW.Wrapper>
    );
  }
}
