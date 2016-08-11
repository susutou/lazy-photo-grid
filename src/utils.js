export function randInt(lower, upper) {
  const intLower = Math.ceil(lower);
  const intUpper = Math.floor(upper);
  return Math.floor(Math.random() * (intUpper - intLower)) + intLower;
}

/**
 * Search something in a collection, comparing element to compare(item)
 *
 * @param collection {Array}
 * @param element {String|Number}
 * @param compare {Function}
 */
export function binarySearch(collection, element, compare) {
  if (collection && collection.length) {
    let low = 0;
    let high = collection.length - 1;

    while (low <= high) {
      let mid = low + Math.floor((high - low) / 2);
      let cmp = compare(collection[mid], element);
      if (cmp > 0) {
        high = mid - 1;
      } else if (cmp < 0) {
        low = mid + 1;
      } else {
        return mid;
      }
    }
    return low + Math.floor((high - low) / 2);
  } else {
    return -1;
  }
}