import React from 'react';
import { View } from 'react-native';
import { SwissProvider } from 'swiss-react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaView } from 'react-native';
import OneSignal from 'react-native-onesignal';
import CoreProvider from 'core/react/_hocs/CoreProvider';
import Redirecter from 'src/Redirecter';
import InitLoading from 'src/react/InitLoading/InitLoading.js';
import 'src/swiss/SwissInit';

export default function RootWrapper(Component, store, persistor, requireAuth) {
  return class StoreWrapper extends React.Component {
    constructor(props) {
      super(props);
      OneSignal.init('2e131867-f1c1-4af5-8188-23fcf8978a22');

      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
      OneSignal.inFocusDisplaying(2);
    }

    componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
      // console.log('Notification received: ', notification);
    }

    onOpened(openResult) {
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult);
    }

    onIds(device) {
      // console.log('Device info: ', device);
    }

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
