import React, { Component } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { goSignUp } from "src/navigation";

export default class SignIn extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <Text>Sign in</Text>
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
