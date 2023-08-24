import DatabaseException from '../exceptions/DatabaseException.mjs';

export default class HeartbeatUsecases {
  /**
   * @param {HeartbeatRepository} heartbeatRepository
   */
  constructor({ heartbeatRepository }) {
    this.heartbeatRepository = heartbeatRepository;
  }

  /**
   * @return {Promise<{response: string}>}
   */
  async test() {
    try {
      await this.heartbeatRepository.test();
    } catch (err) {
      console.trace(err);
      throw new DatabaseException('Нет доступа к базе данных.');
    }
  }
}
