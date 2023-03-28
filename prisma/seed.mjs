import prisma from '../src/libs/prisma.mjs';
import BusinessEntitySeeder from './seeds/BusinessEntitySeeder.mjs';
import PermissionSeeder from './seeds/PermissionSeeder.mjs';
import RoleSeeder from './seeds/RoleSeeder.mjs';
import UserSeeder from './seeds/UserSeeder.mjs';
import RelationSeeder from './seeds/RelationSeeder.mjs';
import RelationMemberSeeder from './seeds/RelationMemberSeeder.mjs';

async function main() {
  const seeders = [
    PermissionSeeder,
    RoleSeeder,
    BusinessEntitySeeder,
    RelationSeeder,
    UserSeeder,
    RelationMemberSeeder,
  ];

  await prisma.$transaction(async (tx) => {
    for (const seeder of seeders) {
      const instance = new seeder(tx);
      await instance.run();
    }
  });
}

main().then();
