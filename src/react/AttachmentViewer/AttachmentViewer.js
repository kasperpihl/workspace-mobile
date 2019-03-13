import React, { PureComponent } from 'react';
import { Navigation } from 'react-native-navigation';
import request from 'core/utils/request';
import SW from './AttachmentViewer.swiss';

// This has to be a class because I don't have a way to bind
// the cancel button with hooks. Unless I make it a custom react component
// that I don't want to do.
export default class AttachmentViewer extends PureComponent {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'Close') {
      this.dismissModal();
    }
  }
  dismissModal() {
    Navigation.dismissModal('AttachmentViewer', {
      animations: {
        dismissModal: {
          enabled: false,
        },
      },
    });
  }
  componentDidMount() {
    this.fetchFile();
  }
  async fetchFile() {
    const { attachment } = this.props;
    const { fileId } = attachment;

    const res = await request('file.get', {
      file_id: fileId,
    });

    if (this._unmounted) {
      return;
    }

    if (!res.ok) {
      // T_TODO display some kind of error alert
      return;
    }

    // T_TODO display some kind of error alert
    // that the file is not supported

    // if (!this.getComponentForFile(res.file)) {
    // loader.error('fetch', 'Unsupported file');
    // return;
    // }

    this.setState({ file: res.file });
  }

  render() {
    console.log(this.props);
    return <SW.Wrapper />;
  }
}
