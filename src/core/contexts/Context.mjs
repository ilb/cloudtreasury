export default class Context {
  static build() {

  }

  static buildRequest(context) {
    let request = {};

    if (context.body) {
      request = { ...(typeof context.body === 'string' ? JSON.parse(context.body) : context.body) };
    }

    if (context.params) {
      request = { ...request, ...context.params };

      if (context?.params?.id) {
        request.id = parseInt(context.params.id);
      }
    }

    if (context.query) {
      request = { ...request, ...context.query };

      if (context?.query?.id) {
        request.id = parseInt(context.query.id);
      }
    }

    return request;
  }
}