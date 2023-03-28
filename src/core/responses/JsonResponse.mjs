import Response from './Response.mjs';

export default class JsonResponse extends Response {
  static async build(result, res) {
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.json(result);
    } else {
      res.end();
    }
  }
}