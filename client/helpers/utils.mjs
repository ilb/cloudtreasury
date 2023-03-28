import AuthHelper from '../../src/helpers/AuthHelper.mjs';

export const filterObjByKey = (object, keys) => {
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

/**
 * Обновление страницы
 * @param router
 * @param scroll
 */
export const updatePage = (router, scroll = true) => {
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    null,
    { scroll },
  );
};

export const ucfirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getUserPermissions = async (user) => {
  return AuthHelper.getUserPermissions(user);
};

export const arrayColumn = (array, key) => {
  return array.map((item) => item[key]);
};

export const objectFill = (keys, value) => {
  return keys.reduce((acc, cur) => {
    acc[cur] = value;

    return acc;
  }, {});
};

export const getPermissionCodes = (user) => {
  const permissions = (user?.user?.relationMembers[0]?.role?.permissions).map((item) => {
    return item.code;
  });
  return permissions;
};

// format from yyyy-mm-dd to dd.mm.yyyy
export const formatDate = date => date.split('-').reverse().join('.');