import { styleSheet } from "swiss-react";
import { View, Text } from "react-native";

export default styleSheet("SignIn", {
  Wrapper: {
    _el: View,
    _flex: ["column", "center", "center"],
    _size: ["100%", "100%"],
    _padding: [0, 20]
  },
  FormWrapper: {
    marginTop: "70",
    _size: ["100%", "auto"]
  },
  HeaderText: {
    _el: Text,
    fontSize: "30",
    fontWeight: "bold"
  },
  DontHaveAnAccountText: {
    _el: Text,
    fontSize: "15",
    color: "$sw1"
  }
});
