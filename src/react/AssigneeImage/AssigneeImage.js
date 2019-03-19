import React from 'react';
import userGetInitials from 'core/utils/user/userGetInitials';
import userGetPhoto from 'core/utils/user/userGetPhoto';
import SW from './AssigneeImage.swiss';

export default props => {
  const { userId, organizationId, size = 22, imageSize = 192 } = props;
  const photoUrl = userGetPhoto(userId, organizationId, imageSize);
  const initials = userGetInitials(userId, organizationId);

  if (photoUrl) {
    return <SW.Image size={size} source={{ uri: photoUrl }} />;
  }

  return (
    <SW.InitialWrapper size={size}>
      <SW.Initial>{initials.toUpperCase()}</SW.Initial>
    </SW.InitialWrapper>
  );
};
