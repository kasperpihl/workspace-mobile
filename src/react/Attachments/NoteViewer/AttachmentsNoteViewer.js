import React, { PureComponent } from 'react';
import { WebView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import getGlobals from 'src/utils/getGlobals';
import SW from './AttachmentsNoteViewer.swiss';

const globals = getGlobals();
const generateNoteUrl = ({ token, noteId, teamId }) => {
  const clientUrl = globals.get('clientUrl');
  return `${clientUrl}/note.html?token=${token}&note_id=${noteId}&team_id=${teamId}`;
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
  onWebviewMessage(e) {
    const data = JSON.parse(e.nativeEvent.data);

    if (data.action === 'url') {
      return Linking.openURL(data.value);
    }
  }

  render() {
    const { attachment, teamId, token } = this.props;
    const { id, title } = attachment;
    const noteUrl = generateNoteUrl({ token, noteId: id, teamId });

    return (
      <SW.Wrapper>
        <SW.Title numberOfLines={1}>{title}</SW.Title>
        <WebView
          source={{ uri: noteUrl }}
          scalesPageToFit
          // style={styles.webviewStyles}
          onMessage={this.onWebviewMessage}
          startInLoadingState
        />
      </SW.Wrapper>
    );
  }
}
