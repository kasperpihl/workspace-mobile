import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/screens";
import "src/swiss/SwissInit";

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Init"
      }
    }
  });
});
