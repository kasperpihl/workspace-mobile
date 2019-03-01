import { useRef, useEffect } from 'react';
import { AppState } from 'react-native';

export default function useAppState(callback) {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (callbackRef.current) {
      const handleAppState = nextAppState => {
        if (nextAppState.match(/inactive|background/)) {
          callbackRef.current();
        }
      };

      AppState.addEventListener('change', handleAppState);
      return () => {
        AppState.removeEventListener('change', handleAppState);
      };
    }
  }, []);
}
