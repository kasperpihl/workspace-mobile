import React from 'react';
import userGetInitials from 'core/utils/user/userGetInitials';
import userGetPhoto from 'core/utils/user/userGetPhoto';
import SW from './AssigneeImage.swiss';

export default props => {
  const { userId, teamId, size = 22, imageSize = 192 } = props;
  const photoUrl = userGetPhoto(userId, teamId, imageSize);
  let initials = userGetInitials(userId, teamId);

  if (photoUrl) {
    return <SW.Image size={size} source={{ uri: photoUrl }} />;
  }

  if (!initials) {
    initials = '!?';
  }

  return (
    <SW.InitialWrapper size={size}>
      <SW.Initial>{initials.toUpperCase()}</SW.Initial>
    </SW.InitialWrapper>
  );
};
