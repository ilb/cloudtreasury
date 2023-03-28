import ModelBuilder from './ModelBuilder.mjs';

export default class UserModelBuilder extends ModelBuilder {
  static make(data, schema) {
    data.roleId = data?.relationMembers && data?.relationMembers[0] && data.relationMembers[0].role.id || null

    return super.make(data, schema);
  }
}