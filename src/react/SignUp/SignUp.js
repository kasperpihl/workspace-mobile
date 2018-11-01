import React, { Component } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { goSignIn } from "src/navigation";
import Input from "src/react/input/Input";
import FormButton from "src/react/FormButton/FormButton";
import SW from "src/react/SignUp/SignUp.swiss";

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
              <FormButton label={"Create account"} />
            </View>
          </SW.FormWrapper>
          <View style={{ marginTop: 150 }}>
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
      </SafeAreaView>
    );
  }
}
