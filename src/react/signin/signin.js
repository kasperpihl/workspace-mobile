import React, { Component } from "react";
import { Text, View, Button, SafeAreaView } from "react-native";
import { goSignUp } from "../../navigation";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none"
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        display: ""
      });
    }, 0);
  }
  render() {
    const { display } = this.state;

    return (
      <SafeAreaView
        style={{ display: display, flex: 1, backgroundColor: "#fff" }}
      >
        <View>
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
