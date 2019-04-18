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
import LogoHeader from 'src/react/LogoHeader/LogoHeader';
import TextButton from 'src/react/TextButton/TextButton';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import withKeyboard from 'src/utils/withKeyboard';
import SW from './ForgottenPassword.swiss';

@withKeyboard
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
    const { keyboardIsShown } = this.props;
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
        <KeyboardAvoidingView
          behavior={behavior}
          style={{
            width: '100%',
            height: '100%',
            flex: 1.7,
          }}
        >
          <SW.Wrapper>
            {!keyboardIsShown && <LogoHeader subtitle={'Reset Password'} />}
            <SW.CopyText>
              {`Enter your email to reset your password.`}
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
                    label={`Send 'Reset Password' Email`}
                    onPress={this.handleSendResetEmail}
                  />
                </View>
              </Form>
            </SW.FormWrapper>
            <SW.FooterWrapper>
              <TextButton
                onPress={() => {
                  goSignIn();
                }}
                title="CANCEL"
                textType="captionDark"
                height="auto"
              />
            </SW.FooterWrapper>
          </SW.Wrapper>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
