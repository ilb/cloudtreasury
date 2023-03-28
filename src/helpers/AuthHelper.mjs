export default class AuthHelper {
  static getUserPermissions(user) {
    if (!user?.relationMembers) return [];

    return user.relationMembers.reduce((permissions, relationMember) => [
      ...permissions,
      ...relationMember.role.permissions.map(permission => permission.code),
    ], []);
  }
}