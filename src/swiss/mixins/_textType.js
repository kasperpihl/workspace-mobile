import { addMixin } from 'swiss-react';
import textTypes from 'src/utils/textTypes';

addMixin('textType', function textType(textType) {
  if (textTypes[textType]) {
    return textTypes[textType];
  }
});
