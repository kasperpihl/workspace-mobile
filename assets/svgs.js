import React from 'react';
import { Polygon, Svg, G, Path } from 'react-native-svg';

// We have to convert every svg from ./svgs/originals to this format
// Read more here https://medium.com/@stowball/creating-an-svg-icon-system-in-react-native-fa0964ea5fe4
// Please keep the naming of the keys the same as the files from ./svgs/originals

// If we need a nodejs script to do the work for us
// https://gist.github.com/stowball/fbef3ad3744e09366e3b6eb8187f541e

export default {
  Rocket: <G>
  <Path d="M26.979,3.021C26.979,3.021,18,3,11,10c-2.99,2.99-3,8-1,10s7.01,1.99,10-1C27,12,26.979,3.021,26.979,3.021z M17,11
    c0-1.105,0.895-2,2-2c1.105,0,2,0.895,2,2s-0.895,2-2,2C17.895,13,17,12.105,17,11z"/>
  <Path d="M18.811,18.676c0,0,0.757,3.784-0.757,5.297C15.784,26.243,12,27,12,27l1-7L18.811,18.676z"/>
  <Path d="M11.324,11.189c0,0-3.784-0.757-5.297,0.757C3.757,14.216,3,18,3,18l7-1L11.324,11.189z"/>
  <Path d="M9.542,22.34c-0.045,0.064-0.072,0.138-0.13,0.195c-0.975,0.975-2.438,0.488-2.438,0.488s-0.488-1.463,0.488-2.438
    c0.058-0.058,0.131-0.084,0.195-0.13L7.2,19.997c-0.38,0.1-0.741,0.29-1.038,0.587c-1.366,1.366-1.149,4.4-1.149,4.4
    s3.016,0.235,4.4-1.149C9.71,23.538,9.9,23.177,10,22.797L9.542,22.34z"/></G>,
}