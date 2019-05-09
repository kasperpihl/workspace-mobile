import React from 'react';
import Icon from 'src/react/Icon/Icon';
import SW from './LogoHeader.swiss';

export default function LogoHeader({ title, subtitle }) {
  return (
    <SW.Wrapper>
      <Icon name="Logo" fill="green" width={120} height={120} />
      <SW.Title numberOfLines={1}>Swipes</SW.Title>
      <SW.Subtitle numberOfLines={1}>{subtitle}</SW.Subtitle>
    </SW.Wrapper>
  );
}
