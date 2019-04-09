import { addMixin } from 'swiss-react';
import textTypes from 'src/utils/textTypes';

addMixin('textType', function textType(textType) {
  console.log(textTypes);
  console.log(textTypes[textType]);
  if (textTypes[textType]) {
    return textTypes[textType];
  }
});
