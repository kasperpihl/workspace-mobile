import { addMixin } from 'swiss-react';

function border(props, size, color, side) {
  if (side) {
    if (typeof side === 'string') {
      const uppercaseSide = side.charAt(0).toUpperCase() + side.slice(1);

      return {
        [`border${uppercaseSide}Width`]: size,
        [`border${uppercaseSide}Color`]: color,
      };
    }
    return {
      borderWidth: size,
      borderColor: color,
      borderRadius: side,
    };
  }

  return {
    borderWidth: size,
    borderColor: color,
  };
}

addMixin('border', border);

// You can do something like this
// _borderDerivedFromProps: props => {
//   return props.indent > 0 ? [1, '$sw2', 'left'] : null;
// }
addMixin('borderDerivedFromProps', function(props, func) {
  let arr = null;

  if (typeof func === 'function') {
    arr = func(props);
  }

  if (Array.isArray(arr)) {
    var [size, color, side] = arr;
  }

  return border(props, size, color, side);
});
