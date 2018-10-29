import React, { Component } from "react";
import { View, Button, SafeAreaView } from "react-native";
import { goSignIn } from "src/navigation";
import SW from "./SignUp.swiss";

export default class SignUp extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <SW.Text>Sign up</SW.Text>
          <Button
            onPress={() => {
              goSignIn();
            }}
            title="Sign in"
          />
        </View>
      </SafeAreaView>
    );
  }
}
