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
    this.jobId = null;
  }
  state = {
    loaded: false,
  };
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
  componentWillUnmount() {
    if (this.jobId) {
      RNFS.stopDownload(this.jobId);
      this.cleanFileFromFileSystem();
    }
  }
  componentDidMount() {
    this.fetchFile();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { file, loaded } = this.state;

    if (!file || loaded) {
      return;
    }

    const url = file.s3_url;
    const localFile = getLocalPath(url);
    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    const openOptions = {
      onDismiss: () => {
        this.cleanFileFromFileSystem();
        this.dismissModal();
      },
    };

    const donwloadRes = RNFS.downloadFile(options);

    this.jobId = donwloadRes.jobId;

    donwloadRes.promise
      .then(() => {
        this.setState({ loaded: true });
        return FileViewer.open(localFile, openOptions);
      })
      .then(() => {
        // success
      })
      .catch(error => {
        // T_TODO close the modal or display `try again` button
      });
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

  cleanFileFromFileSystem = () => {
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
    const { attachment } = this.props;
    const { title } = attachment;
    const { loaded } = this.state;

    if (loaded) {
      return null;
    }

    return (
      <SW.Wrapper>
        <SW.Title>{title}</SW.Title>
        <SW.LoaderContainer>
          <ActivityIndicator size="large" color="#007AFF" />
        </SW.LoaderContainer>
      </SW.Wrapper>
    );
  }
}
