import React, { Component } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { goSignUp, goForgottenPassword } from "src/navigation";
import Input from "src/react/input/Input";
import FormButton from "src/react/FormButton/FormButton";
import SW from "./SignIn.swiss";

export default class SignIn extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <SW.Wrapper>
          <SW.HeaderText>Swipes</SW.HeaderText>
          <SW.FormWrapper>
            <Input label={"Email"} textContentType={"username"} />
            <View style={{ marginTop: 30 }}>
              <Input
                label={"Password"}
                textContentType={"password"}
                secureTextEntry={true}
              />
            </View>
            <View style={{ marginTop: 80 }}>
              <FormButton label={"Sign in"} />
              <Button
                onPress={() => {
                  goForgottenPassword();
                }}
                title="Forgot your password?"
              />
            </View>
          </SW.FormWrapper>
          <View style={{ marginTop: 150 }}>
            <SW.DontHaveAnAccountText>
              {`Don't have an account?`}
            </SW.DontHaveAnAccountText>
            <Button
              onPress={() => {
                goSignUp();
              }}
              title="Sign up"
            />
          </View>
        </SW.Wrapper>
      </SafeAreaView>
    );
  }
}
