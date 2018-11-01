import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Redirecter from 'src/Redirecter';
import 'src/swiss/SwissInit';

export default function RootWrapper(Component, store, persistor, requireAuth) {
  return class StoreWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Redirecter requireAuth={requireAuth}>
              <Component />
            </Redirecter>
          </PersistGate>
        </Provider>
      );
    }
  };
}
