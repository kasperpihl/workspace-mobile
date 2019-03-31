import React, { PureComponent } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { WebView } from 'react-native-webview';
import getGlobals from 'src/utils/getGlobals';
import SW from './AttachmentsNoteViewer.swiss';

const globals = getGlobals();
const generateNoteUrl = ({ token, noteId }) => {
  const clientUrl = globals.get('clientUrl');
  return `${clientUrl}/note.html?auth_token=${token}&note_id=${noteId}`;
};

@connect(state => ({
  token: state.auth.get('token'),
}))
export default class AttachmentsNoteViewer extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'Close') {
      this.dismissModal();
    }
  }
  dismissModal = () => {
    Navigation.dismissAllModals({
      animations: {
        dismissModal: {
          enabled: false,
        },
      },
    });
  };
  // onWebviewMessage(e) {
  //   console.log(e);
  //   console.log(e.nativeEvent.data);
  //   // const data = JSON.parse(e.nativeEvent.data);

  //   // if (data.action === 'url') {
  //   //   return Linking.openURL(data.value);
  //   // }
  // }

  render() {
    const { attachment, token } = this.props;
    const { id, title } = attachment;
    const noteUrl = generateNoteUrl({ token, noteId: id });

    return (
      <SW.Wrapper>
        <SW.Title numberOfLines={1}>{title}</SW.Title>
        <SW.WebViewWrapper>
          <WebView
            source={{ uri: noteUrl }}
            scalesPageToFit
            style={{
              marginTop: 15,
            }}
            // onMessage={this.onWebviewMessage}
            startInLoadingState
          />
        </SW.WebViewWrapper>
      </SW.Wrapper>
    );
  }
}
