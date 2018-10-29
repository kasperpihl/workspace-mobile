import React, { Component } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { goSignIn } from "../../navigation";

export default class SignUp extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <Text>Sign up</Text>
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
