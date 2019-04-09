import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from 'assets/svgs';

console.log(svgs);

const Icon = props => <SvgIcon width={36} height={36} svgs={svgs} {...props} />;

export default Icon;
