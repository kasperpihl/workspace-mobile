import { createStore, combineReducers } from "redux";
import user from "src/reducers/user";

export default function configureStore() {
  const store = createStore(
    combineReducers({
      user
    })
  );

  return {
    store
  };
}
