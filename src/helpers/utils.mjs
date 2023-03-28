export const isProduction = process.env.ILB_SYSID === 'PRODUCTION';
export const isDevel = process.env.ILB_SYSID === 'DEVEL';
export const isLocal = process.env.ILB_SYSID === 'LOCAL';

export const buildRequest = (req) => {
  let request = {};

  if (req.body) {
    request = { ...(typeof req.body === 'string' ? JSON.parse(req.body) : req.body) };
  }

  if (req.params) {
    request = { ...request, ...req.params };

    if (req?.params?.id) {
      request.id = parseInt(req.params.id)
    }
  }

  if (req.query) {
    request = { ...request, ...req.query };

    if (req?.query?.id) {
      request.id = parseInt(req.query.id)
    }
  }

  return request;
}

export const filterObject = (object, callback) => {
  return Object.keys(object)
    .filter( key => callback(object[key]) )
    .reduce( (res, key) => (res[key] = object[key], res), {} );
}