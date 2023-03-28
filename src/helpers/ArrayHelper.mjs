export default class ArrayHelper {
  static isEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1 == null || arr2 == null) return false;
    if (arr1.length !== arr2.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    arr1 = arr1.sort();
    arr2 = arr2.sort();

    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
}