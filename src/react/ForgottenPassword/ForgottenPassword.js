import React, { Component } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { goSignIn } from "src/navigation";
import Input from "src/react/Input/Input";
import FormButton from "src/react/FormButton/FormButton";
import SW from "./ForgottenPassword.swiss";

export default class SignIn extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <SW.Wrapper>
          <SW.HeaderText>Forgot password?</SW.HeaderText>
          <SW.CopyText>
            {`Enter you email and we'll send you an email to reset your password.`}
          </SW.CopyText>
          <SW.FormWrapper>
            <Input label={"Email"} textContentType={"username"} />
            <View style={{ marginTop: 80 }}>
              <FormButton label={"Reset password"} />
              <Button
                onPress={() => {
                  goSignIn();
                }}
                title="Cancel"
              />
            </View>
          </SW.FormWrapper>
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
