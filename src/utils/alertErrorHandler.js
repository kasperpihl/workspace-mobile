import { Alert } from 'react-native';

export default function alertErrorHandler(error, defaultMessage = null) {
  let alertError = 'Error';
  let alertSubError = 'Ooops! Something went wrong. Please try again later';

  if (error && error.error === 'Validation error') {
    const validationError = error.errorInfo.validationError;

    if (/Invalid object\[\'(\w+)\'\]/.test(validationError)) {
      const match = /Invalid object\[\'(\w+)\'\]/.exec(validationError);
      alertSubError = `Invalid ${match[1].replace('_', ' ')}`;
    }
  } else if (error && error.error !== 'Something went wrong') {
    alertSubError = error.error;
  } else if (defaultMessage) {
    alertSubError = defaultMessage;
  }

  Alert.alert(alertError, alertSubError, [{ text: 'OK' }], {
    cancelable: false,
  });
}
