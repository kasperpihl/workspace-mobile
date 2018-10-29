import { Navigation } from "react-native-navigation";

export function registerScreens() {
  Navigation.registerComponent(
    "SignUp",
    () => require("./react/signup/Signup").default
  );
  Navigation.registerComponent(
    "SignIn",
    () => require("./react/signin/Signin").default
  );
  Navigation.registerComponent("Organise", () => require("./Organise").default);
  Navigation.registerComponent("Plan", () => require("./Plan").default);
  Navigation.registerComponent("Discuss", () => require("./Discuss").default);
  Navigation.registerComponent("Init", () => require("./Init").default);
}
