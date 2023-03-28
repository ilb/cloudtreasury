export default class Map {
  static forSelect(array) {
    return array?.map(item => ({ label: item.title, value: item.id }));
  }
}