import Response from './Response.mjs';
import ForbiddenException from '../exceptions/ForbiddenException.mjs';
import UnauthorizedException from '../exceptions/UnauthorizedException.mjs';

export default class PageResponse extends Response {
  static async build(object) {
    return { props: object };
  }

  /**
   * @param exception
   * @return {Promise<{notFound: boolean}|{error}>}
   */
  static async exception(exception) {
    if (exception instanceof ForbiddenException) {
      return {
        notFound: true
      }
    }

    if (exception instanceof UnauthorizedException) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      };
    }

    return { error: exception.message };
  }
}