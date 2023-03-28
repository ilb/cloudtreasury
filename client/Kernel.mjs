import { createContainer, asClass } from 'awilix';
import PermissionResource from './resources/PermissionResource.mjs';
import RoleResource from './resources/RoleResource.mjs';
import UserResource from './resources/UserResource.mjs';
import PermissionSchema from './scheme/PermissionSchema.mjs';
import RoleSchema from './scheme/RoleSchema.mjs';
import UserSchema from './scheme/UserSchema.mjs';
import SigninSchema from './scheme/SigninSchema.mjs';
import SignupSchema from './scheme/SignupSchema.mjs';

export default class Kernel {
  constructor() {
    this.container = createContainer();
  }

  createApplication() {
    this.registerClasses();

    return this.container;
  }

  registerClasses() {
    this.container.register({
      permissionResource: asClass(PermissionResource),
      roleResource: asClass(RoleResource),
      userResource: asClass(UserResource),

      permissionSchema: asClass(PermissionSchema),
      roleSchema: asClass(RoleSchema),
      userSchema: asClass(UserSchema),
      signinSchema: asClass(SigninSchema),
      signupSchema: asClass(SignupSchema),
    });
  }
}
