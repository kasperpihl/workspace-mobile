import { List } from 'immutable';

export default function(order, focusedId) {
  let range = List();

  if (!focusedId) return range;

  const startIndex = order.findIndex(item => item.get('id') === focusedId);

  if (order.get(startIndex).get('indent') === 0) return range;

  let currentIndex;

  // go forward
  currentIndex = startIndex;
  while (
    order.get(currentIndex).get('indent') >= order.get(startIndex).get('indent')
  ) {
    range = range.push(order.get(currentIndex).get('id'));
    currentIndex = currentIndex + 1;
  }

  // go backward
  currentIndex = startIndex - 1;
  while (
    order.get(currentIndex).get('indent') >= order.get(startIndex).get('indent')
  ) {
    range = range.push(order.get(currentIndex).get('id'));
    currentIndex = currentIndex - 1;
  }

  return range;
}
