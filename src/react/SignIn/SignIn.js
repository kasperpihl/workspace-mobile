import React, { Component } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import { goSignUp, goHome, goForgottenPassword } from "src/navigation";
import Input from "src/react/input/Input";
import FormButton from "src/react/FormButton/FormButton";
import SW from "src/react/SignIn/SignIn.swiss";
import * as actions from "src/actions";

@connect(
  state => ({
    signedIn: state.user.get("signedIn")
  }),
  {
    signin: actions.signin
  }
)
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.handleSignIn = this.handleSignIn.bind(this);
  }
  handleSignIn() {
    const { signin } = this.props;

    signin();
  }
  render() {
    const { signedIn } = this.props;

    if (signedIn) {
      goHome();
      return null;
    }

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
              <FormButton onPress={this.handleSignIn} label={"Sign in"} />
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
