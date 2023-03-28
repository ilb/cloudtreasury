export default class Response {
  static build() {}

  /**
   * @param res
   * @param {Exception} exception
   */
  static exception(exception, res = null) {
    res.status(exception.status || 500).json({ error: exception.message || 'Упс... Что-то пошло не так' })
  }
}