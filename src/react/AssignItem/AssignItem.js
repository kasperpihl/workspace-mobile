import React from 'react';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './AssignItem.swiss';

export default function AssignItem({ userId, teamId, fullName, assigned }) {
  const renderRightButton = () => {
    const icon = assigned ? 'X' : 'Plus';

    return <IconTouchableWrapper icon={icon} fill="dark" />;
  };

  return (
    <SW.Wrapper>
      <AssigneeImage userId={userId} teamId={teamId} imageSize={64} />
      <SW.FullName>{fullName}</SW.FullName>
      <SW.RightButton>{renderRightButton()}</SW.RightButton>
    </SW.Wrapper>
  );
}
