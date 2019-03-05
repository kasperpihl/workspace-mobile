import React from 'react';
import AssigneeImage from 'src/react/AssigneeImage/AssigneeImage';
import IconTouchableWrapper from 'src/react/Icon/IconTouchableWrapper';
import SW from './AssignItem.swiss';

export default function AssignItem({
  userId,
  organizationId,
  fullName,
  assigned,
}) {
  const renderRightButton = () => {
    const icon = assigned ? 'x' : 'plus';
    const iconColor = assigned ? 'sw2' : 'blue';

    return (
      <IconTouchableWrapper
        icon={icon}
        fill={iconColor}
        width="14"
        height="14"
      />
    );
  };

  return (
    <SW.Wrapper>
      <AssigneeImage userId={userId} organizationId={organizationId} />
      <SW.FullName>{fullName}</SW.FullName>
      <SW.RightButton>{renderRightButton()}</SW.RightButton>
    </SW.Wrapper>
  );
}
