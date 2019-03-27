import React from 'react';
import { View } from 'react-native';
import { SwissProvider } from 'swiss-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaView } from 'react-native';
import CoreProvider from 'core/react/_hocs/CoreProvider';
import Redirecter from 'src/Redirecter';
import InitLoading from 'src/react/InitLoading/InitLoading.js';
import 'src/swiss/SwissInit';

export default function RootWrapper(Component, store, persistor, requireAuth) {
  return class StoreWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <SwissProvider defaultEl={View}>
            <CoreProvider>
              <PersistGate persistor={persistor}>
                <Redirecter requireAuth={requireAuth}>
                  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <InitLoading requireAuth={requireAuth}>
                      <Component {...this.props} />
                    </InitLoading>
                  </SafeAreaView>
                </Redirecter>
              </PersistGate>
            </CoreProvider>
          </SwissProvider>
        </Provider>
      );
    }
  };
}
