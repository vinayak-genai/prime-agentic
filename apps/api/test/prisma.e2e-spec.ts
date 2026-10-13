import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import {
  PostgreSqlContainer,
  type StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

function dockerAvailable(): boolean {
  try {
    execSync('docker info', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

describe.skipIf(!dockerAvailable())('Prisma Postgres round-trip', () => {
  let container: StartedPostgreSqlContainer;
  let prisma: PrismaClient;

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16-alpine').start();
    const url = container.getConnectionUri();
    execSync('pnpm prisma migrate deploy', {
      env: { ...process.env, DATABASE_URL: url },
      stdio: 'pipe',
    });
    prisma = new PrismaClient({ datasources: { db: { url } } });
  }, 120_000);

  afterAll(async () => {
    await prisma?.$disconnect();
    await container?.stop();
  });

  it('applies the migration and round-trips a row', async () => {
    const created = await prisma.demoRequest.create({
      data: {
        name: 'Ada',
        email: 'ada@example.com',
        company: 'Acme',
        platform: 'financial-planner',
        message: 'hi',
        consentVersion: 'v1',
        consentAt: new Date(),
      },
    });
    expect(created.id).toBeTruthy();

    const found = await prisma.demoRequest.findUnique({
      where: { id: created.id },
    });
    expect(found?.email).toBe('ada@example.com');
    expect(found?.emailStatus).toBe('pending');
  });
});
