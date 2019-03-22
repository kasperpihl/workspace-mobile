import React, { useState, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { List } from 'immutable';
import request from 'core/utils/request';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import colors from 'src/utils/colors';
import SW from './ChatCommentComposer.swiss';

export default function ChatCommentComposer({ discussionId }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const firstModalRef = useRef(null);
  const secondModalRef = useRef(null);

  let index = 0;
  const firstModalData = [
    { key: index++, section: true, label: 'Add attachment' },
    { key: index++, section: true, label: 'Add url' },
    { key: index++, section: true, label: 'Upload file' },
  ];
  // const secondModalData = [
  //   { key: index++, section: true, label: 'Add attachment' },
  //   { key: index++, section: true, label: 'Add url' },
  //   { key: index++, section: true, label: 'Upload file' }
  // ];

  const handleSubmitMessage = () => {
    const attachments = List([]);

    setLoading(true);
    request('comment.add', {
      discussion_id: discussionId,
      attachments,
      message,
    }).then(res => {
      setLoading(false);
      // T_TODO show error if something goes wrong
    });

    setMessage('');
  };

  renderSendIcon = () => {
    if (loading) {
      return (
        <SW.LoaderContainer>
          <ActivityIndicator size="small" color={colors['blue']} />
        </SW.LoaderContainer>
      );
    }

    return (
      <IconTouchableWrapper
        icon={'send'}
        fill={'sw2'}
        width="21"
        height="21"
        onPress={handleSubmitMessage}
      />
    );
  };

  return (
    <SW.Wrapper>
      <ModalSelector
        data={firstModalData}
        ref={firstModalRef}
        customSelector={<View />}
        animationType={'none'}
        overlayStyle={{
          // backgroundColor: 'transparent',
          justifyContent: 'flex-end',
        }}
        optionStyle={{ opacity: 1, backgroundColor: 'red' }}
        optionContainerStyle={{ opacity: 1, backgroundColor: 'white' }}
        cancelText={'Cancel'}
      />
      {/* <ModalSelector
        data={firstModalData}
        ref={secondModalRef}
        customSelector={<View />}
      /> */}
      <SW.InputWrapper>
        <SW.Input
          multiline
          placeholder="Aa"
          value={message}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <IconTouchableWrapper
          icon={'attach'}
          fill={'sw2'}
          width="13"
          height="21"
          onPress={() => {
            firstModalRef.current.open();
          }}
        />
      </SW.InputWrapper>
      <SW.SendIconWrapper>{renderSendIcon()}</SW.SendIconWrapper>
    </SW.Wrapper>
  );
}

// export default connect(state => ({
//   myId: state.me.get('user_id'),
// }))(ChatOverview);
