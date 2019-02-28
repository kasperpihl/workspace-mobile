import React, { Component } from 'react';
import {
  Button,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import request from 'core/utils/request';
import { goSignIn } from 'src/navigation';
import { Form, FormTextInput } from 'src/react/Form/Form';
import FormButton from 'src/react/FormButton/FormButton';
import FormLabel from 'src/react/FormLabel/FormLabel';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import SW from './ForgottenPassword.swiss';

export default class ForgottenPassword extends Component {
  state = {
    emailVal: '',
  };
  handleChangeText = field => value => {
    this.setState({ [field]: value });
  };
  handleSendResetEmail = () => {
    const { emailVal } = this.state;

    request('user.sendResetEmail', {
      email: emailVal,
    }).then(res => {
      if (res.ok === false) {
        alertErrorHandler(res);
      } else {
        Alert.alert(
          'Success',
          'Check your email for instructions to reset your password',
          [
            {
              text: 'OK',
              onPress: () => {
                goSignIn();
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      }
    });
  };
  render() {
    const { emailVal } = this.state;
    const behavior = Platform.OS === 'android' ? '' : 'padding';

    return (
      <ScrollView
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView behavior={behavior}>
          <SW.Wrapper>
            <SW.HeaderText>Forgot password?</SW.HeaderText>
            <SW.CopyText>
              {`Enter you email and we'll send you an email to reset your password.`}
            </SW.CopyText>
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
                    last
                    value={emailVal}
                    textContentType={'username'}
                    onChangeText={this.handleChangeText('emailVal')}
                    onSubmitEditing={this.handleSendResetEmail}
                  />
                </View>
                <View>
                  <FormButton
                    label={'Reset password'}
                    onPress={this.handleSendResetEmail}
                  />
                  <Button
                    onPress={() => {
                      goSignIn();
                    }}
                    title="Cancel"
                  />
                </View>
              </Form>
            </SW.FormWrapper>
          </SW.Wrapper>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
