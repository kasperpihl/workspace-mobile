import { Navigation } from "react-native-navigation";
import configureStore from "src/store/configureStore";
import HOCRootWrapper from "src/store/HOCRootWrapper";
import Init from "src/Init";
import SignIn from "src/react/SignIn/SignIn";
import SignUp from "src/react/SignUp/SignUp";
import { init } from "swipes-core-js";

const { store } = configureStore();
init(store);

export function registerScreens() {
  Navigation.registerComponent("Init", () => HOCRootWrapper(Init, store));
  Navigation.registerComponent("SignIn", () => HOCRootWrapper(SignIn, store));
  Navigation.registerComponent("SignUp", () => HOCRootWrapper(SignUp, store));
  Navigation.registerComponent(
    "ForgottenPassword",
    () => require("./react/ForgottenPassword/ForgottenPassword").default
  );
  Navigation.registerComponent("Organise", () => require("./Organise").default);
  Navigation.registerComponent("Plan", () => require("./Plan").default);
  Navigation.registerComponent("Discuss", () => require("./Discuss").default);
}
