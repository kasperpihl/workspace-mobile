import React from "react";
import { Provider } from "react-redux";
import "src/swiss/SwissInit";

export default function RootWrapper(Component, store) {
  return class StoreWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <Component />
        </Provider>
      );
    }
  };
}
