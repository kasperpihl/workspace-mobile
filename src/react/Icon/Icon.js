import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import colors from 'src/utils/colors';
import svgs from 'assets/svgs';

const Icon = props => {
  const { fill, height = 36, width = 36, ...rest } = props;

  return (
    <SvgIcon
      width={width}
      height={height}
      fill={colors[fill]}
      svgs={svgs}
      {...rest}
    />
  );
};

export default Icon;
