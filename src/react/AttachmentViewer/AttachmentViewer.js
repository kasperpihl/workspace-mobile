import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import request from 'core/utils/request';
import alertErrorHandler from 'src/utils/alertErrorHandler';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import SW from './AttachmentViewer.swiss';

function getLocalPath(url) {
  const filename = url.split('/').pop();
  return `${RNFS.DocumentDirectoryPath}/${filename}`;
}

// This has to be a class because I don't have a way to bind
// the cancel button with hooks. Unless I make it a custom react component
// that I don't want to do.
export default class AttachmentViewer extends PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  state = {};
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
  componentDidMount() {
    this.fetchFile();
  }

  async fetchFile() {
    const { attachment } = this.props;
    const { id } = attachment;
    const res = await request('file.get', {
      file_id: id,
    });

    if (this._unmounted) {
      return;
    }

    if (!res.ok) {
      return alertErrorHandler(res);
    }

    // T_TODO display some kind of error alert
    // that the file is not supported

    this.setState({ file: res.file });
  }

  deleteFile = () => {
    const { file } = this.state;

    if (!file) {
      return null;
    }

    const url = file.s3_url;
    const localFile = getLocalPath(url);

    RNFS.unlink(localFile)
      .then(() => {
        // console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        // console.log(err.message);
      });
  };

  render() {
    const { file } = this.state;

    if (!file) {
      return null;
    }

    const url = file.s3_url;
    const localFile = getLocalPath(url);
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    const openOptions = {
      onDismiss: () => {
        this.deleteFile();
        this.dismissModal();
      },
      showOpenWithDialog: true,
      showAppsSuggestions: true,
    };

    RNFS.downloadFile(options)
      .promise.then(() => {
        return FileViewer.open(localFile, openOptions);
      })
      .then(() => {
        // success
      })
      .catch(error => {
        // T_TODO close the modal or display `try again` button
      });

    return (
      <SW.Wrapper>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
    );
  }
}
