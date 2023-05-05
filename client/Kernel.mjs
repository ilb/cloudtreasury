import { createContainer, asClass, asValue } from 'awilix';

import PermissionResource from './resources/PermissionResource.mjs';
import RoleResource from './resources/RoleResource.mjs';
import UserResource from './resources/UserResource.mjs';
import StockResource from './resources/StockResource.mjs';
import StockValutionsResource from './resources/StockValutionsResource.mjs';

import PermissionSchema from './scheme/PermissionSchema.mjs';
import RoleSchema from './scheme/RoleSchema.mjs';
import UserSchema from './scheme/UserSchema.mjs';
import SigninSchema from './scheme/SigninSchema.mjs';
import SignupSchema from './scheme/SignupSchema.mjs';
import StockSchema from './scheme/StockSchema.mjs';
import TickerRatingSchema from './scheme/TickerRatingSchema.mjs';
import StockCalculationResults from './scheme/StockCalculationResultsSchema.mjs';
import GeneratingReportSchema from './scheme/GeneratingReportSchema.mjs'


import StockValuationRepository from '../src/repositories/StockValuationRepository.mjs';
import DocumentRenderer from '../src/services/DocumentRenderer.mjs';
import StockValuationService from '../src/services/StockValuationService.mjs';


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
      stockResource: asClass(StockResource),
      stockValutionsResource: asClass(StockValutionsResource),

      permissionSchema: asClass(PermissionSchema),
      roleSchema: asClass(RoleSchema),
      userSchema: asClass(UserSchema),
      signinSchema: asClass(SigninSchema),
      signupSchema: asClass(SignupSchema),
      stockSchema: asClass(StockSchema),
      tickerRatingSchema: asClass(TickerRatingSchema),
      stockCalculationResults: asClass(StockCalculationResults),
      generatingReportSchema: asClass(GeneratingReportSchema),
    });
    this.container.register({
      documentRenderer: asClass(DocumentRenderer),
      stockValuationService: asClass(StockValuationService),
      stockValuationRepository: asClass(StockValuationRepository)
    });
  }
}
