import React from 'react';
import userGetInitials from 'core/utils/user/userGetInitials';
import userGetPhoto from 'core/utils/user/userGetPhoto';
import SW from './AssigneeImage.swiss';

export default props => {
  const { userId, organizationId, size = 22, imageSize } = props;
  const photo = userGetPhoto(userId, organizationId);
  const initials = userGetInitials(userId, organizationId);

  if (photo) {
    return <SW.Image size={size} source={{ uri: photo.get('192x192') }} />;
  }

  return (
    <SW.InitialWrapper size={size}>
      <SW.Initial>{initials.toUpperCase()}</SW.Initial>
    </SW.InitialWrapper>
  );
};
