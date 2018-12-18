import React from 'react';
import { ClipPath, Defs, G, Path, Style } from 'react-native-svg';

export default {
  viewBox: '0 0 21 21',
  svg: (
    <G>
      <Defs>
        <ClipPath id="clip-path">
          <Path
            id="Path_60"
            dataName="Path 60"
            class="cls-1"
            d="M77-77.485h21V-79H77z"
            transform="translate(-77 79)"
          />
        </ClipPath>
        <ClipPath id="clip-path-2">
          <Path
            id="Path_62"
            dataName="Path 62"
            class="cls-1"
            d="M79-84.425a7.531 7.531 0 0 0 7.47 7.575 7.531 7.531 0 0 0 7.47-7.575A7.531 7.531 0 0 0 86.47-92 7.531 7.531 0 0 0 79-84.425zm7.47-6.06a6.019 6.019 0 0 1 5.976 6.06 6.019 6.019 0 0 1-5.976 6.06 6.019 6.019 0 0 1-5.976-6.06 6.019 6.019 0 0 1 5.976-6.06"
            transform="translate(-79 92)"
          />
        </ClipPath>
      </Defs>
      <G
        id="Group_1412"
        dataName="Group 1412"
        transform="translate(641.999 -592)"
      >
        <G
          id="Group_36"
          dataName="Group 36"
          transform="translate(-641.999 611.485)"
          clipPath="url(#clip-path)"
        >
          <Path
            id="Path_59"
            dataName="Path 59"
            class="cls-3"
            d="M72-84h36v16.666H72z"
            transform="translate(-79.5 76.425)"
          />
        </G>
        <G
          id="Group_37"
          dataName="Group 37"
          transform="translate(-638.969 592)"
          clipPath="url(#clip-path-2)"
        >
          <Path
            id="Path_61"
            dataName="Path 61"
            class="cls-3"
            d="M74-97h29.88v30.3H74z"
            transform="translate(-81.47 89.425)"
          />
        </G>
      </G>
    </G>
  ),
};
