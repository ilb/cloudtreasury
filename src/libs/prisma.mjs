import Prisma from '@prisma/client';
import { isLocal } from '../helpers/utils.mjs';

const { PrismaClient } = Prisma;

let prisma;

if (!isLocal) {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export default prisma;
