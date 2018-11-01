import { Navigation } from "react-native-navigation";
import configureStore from "src/store/configureStore";
import HOCStoreWrapper from "src/store/HOCStoreWrapper";
import Init from "src/Init";
import SignIn from "src/react/SignIn/SignIn";
import SignUp from "src/react/SignUp/SignUp";

const { store } = configureStore();

export function registerScreens() {
  Navigation.registerComponent("Init", () => HOCStoreWrapper(Init, store));
  Navigation.registerComponent("SignIn", () => HOCStoreWrapper(SignIn, store));
  Navigation.registerComponent("SignUp", () => HOCStoreWrapper(SignUp, store));
  Navigation.registerComponent(
    "ForgottenPassword",
    () => require("./react/ForgottenPassword/ForgottenPassword").default
  );
  Navigation.registerComponent("Organise", () => require("./Organise").default);
  Navigation.registerComponent("Plan", () => require("./Plan").default);
  Navigation.registerComponent("Discuss", () => require("./Discuss").default);
}
