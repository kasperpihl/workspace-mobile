import OneSignal from 'react-native-onesignal';

export default function oneSignalTag(myId) {
  OneSignal.getTags(receivedTags => {
    if (!receivedTags) {
      receivedTags = {};
    }

    if (myId && !receivedTags.swipesUserId) {
      OneSignal.sendTag('swipesUserId', myId);
    } else if (
      receivedTags.swipesUserId &&
      myId !== receivedTags.swipesUserId
    ) {
      OneSignal.sendTag('swipesUserId', myId);
    }
  });
}
