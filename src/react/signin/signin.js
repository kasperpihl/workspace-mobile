import React, { Component } from "react";
import { View, Button, SafeAreaView } from "react-native";
import { goSignUp } from "src/navigation";
import SW from "./SignIn.swiss";

export default class SignIn extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <SW.Text>Sign in</SW.Text>
          <Button
            onPress={() => {
              goSignUp();
            }}
            title="Sign up"
          />
        </View>
      </SafeAreaView>
    );
  }
}
