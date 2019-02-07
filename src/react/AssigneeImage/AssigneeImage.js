import React from 'react';
import userGetInitials from 'swipes-core-js/utils/user/userGetInitials';
import userGetPhoto from 'swipes-core-js/utils/user/userGetPhoto';
import SW from './AssigneeImage.swiss';

export default props => {
  const { userId, organizationId, size = 22, imageSize } = props;
  const pic = userGetPhoto(userId, organizationId, imageSize);
  const initials = userGetInitials(userId, organizationId);

  if (pic) {
    return <SW.Image size={size} source={{ uri: pic }} />;
  }

  return (
    <SW.InitialWrapper size={size}>
      <SW.Initial>{initials.toUpperCase()}</SW.Initial>
    </SW.InitialWrapper>
  );
};
