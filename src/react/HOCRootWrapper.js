import React from 'react';
import { View } from 'react-native';
import { SwissProvider } from 'swiss-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaView } from 'react-native';
import Redirecter from 'src/Redirecter';
import 'src/swiss/SwissInit';

export default function RootWrapper(Component, store, persistor, requireAuth) {
  return class StoreWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <SwissProvider defaultEl={View}>
            <PersistGate persistor={persistor}>
              <Redirecter requireAuth={requireAuth}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                  <Component {...this.props} />
                </SafeAreaView>
              </Redirecter>
            </PersistGate>
          </SwissProvider>
        </Provider>
      );
    }
  };
}
