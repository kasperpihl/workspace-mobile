import { styleSheet } from "swiss-react";
import { Text } from "react-native";

export default styleSheet("ForgottenPassword", {
  Wrapper: {
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
  CopyText: {
    _el: Text,
    marginTop: "10",
    fontSize: "15",
    color: "$sw1"
  }
});
