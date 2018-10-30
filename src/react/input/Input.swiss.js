import { styleSheet } from "swiss-react";
import { Text, TextInput } from "react-native";

export default styleSheet("Input", {
  Wrapper: {
    _flex: ["column", "flex-start"],
    _size: ["100%", "auto"]
  },
  Label: {
    _el: Text,
    fontSize: "10",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "$sw2"
  },
  TextInput: {
    _el: TextInput,
    _size: ["100%", "auto"],
    _border: ["1", "$sw1", "bottom"],
    _padding: [10, 0],
    fontSize: "15"
  }
});
