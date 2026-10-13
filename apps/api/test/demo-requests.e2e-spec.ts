import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

const validBody = {
  name: 'Ada',
  email: 'ada@example.com',
  company: 'Acme',
  platform: 'financial-planner',
  message: 'hi',
  consent: true,
};

describe('DemoRequests (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        $connect: async () => undefined,
        $disconnect: async () => undefined,
        $queryRaw: async () => [],
        demoRequest: {
          findFirst: async () => null,
          create: async () => ({ id: 'x' }),
          updateMany: async () => ({ count: 0 }),
          findMany: async () => [],
          update: async () => ({}),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api', { exclude: ['health'] });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /api/demo-requests returns 201 for a valid request', async () => {
    await request(app.getHttpServer())
      .post('/api/demo-requests')
      .set('content-type', 'application/json')
      .send(validBody)
      .expect(201)
      .expect({ ok: true });
  });

  it('returns a typed 400 for invalid input', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/demo-requests')
      .set('content-type', 'application/json')
      .send({ ...validBody, consent: false })
      .expect(400);

    expect(res.body.error.code).toBe('validation');
    expect(res.body.error.fields).toHaveProperty('consent');
  });

  it('returns 201 for a honeypot-filled request (fake success)', async () => {
    await request(app.getHttpServer())
      .post('/api/demo-requests')
      .set('content-type', 'application/json')
      .send({ ...validBody, honeypot: 'bot@example.com' })
      .expect(201);
  });

  it('returns 415 for a non-JSON content type', async () => {
    await request(app.getHttpServer())
      .post('/api/demo-requests')
      .set('content-type', 'text/plain')
      .send('name=Ada')
      .expect(415);
  });
});
