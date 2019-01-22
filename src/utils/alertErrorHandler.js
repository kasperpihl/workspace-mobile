import { Alert } from 'react-native';

export default function alertErrorHandler(error) {
  let alertError = 'Error';
  let alertSubError = 'Ooops! Something went wrong. Try again later';

  switch (true) {
    case /Invalid object\[\'(\w+)\'\]/.test(error):
      const match = /Invalid object\[\'(\w+)\'\]/.exec(error);
      alertSubError = `Invalid ${match[1].replace('_', ' ')}`;
      break;
    case /\[TO_CLIENT\]/.test(error):
      alertSubError = error.replace('[TO_CLIENT]', '');
      break;
  }

  Alert.alert(alertError, alertSubError, [{ text: 'OK' }], {
    cancelable: false,
  });
}
