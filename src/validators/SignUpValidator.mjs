export default class SignUpValidator {
  /**
   *
   * @param userRepository
   * @param request
   */
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async validate() {
    this.validateBySchema();
    const user = await this.userRepository.findUserByLogin(this.request.login);

    if (user) {
      throw Error('Non unique login!');
    }
  }

  schema() {
    return {
      type: 'object',
      properties: {
        login: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      required: ['login', 'name', 'password']
    }
  }
}