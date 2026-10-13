import { Test } from '@nestjs/testing';
import { describe, expect, it, vi } from 'vitest';
import { DemoRequestsService } from './demo-requests.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const valid = {
  name: 'Ada',
  email: 'ada@example.com',
  company: 'Acme',
  platform: 'financial-planner' as const,
  message: 'hi',
  consent: true,
};

function createPrismaMock() {
  return {
    demoRequest: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
  };
}

describe('DemoRequestsService', () => {
  it('stores nothing when the honeypot is filled', async () => {
    const prisma = createPrismaMock();
    const module = await Test.createTestingModule({
      providers: [
        DemoRequestsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    const service = module.get(DemoRequestsService);

    await service.create({ ...valid, honeypot: 'bot@example.com' });

    expect(prisma.demoRequest.findFirst).not.toHaveBeenCalled();
    expect(prisma.demoRequest.create).not.toHaveBeenCalled();
  });

  it('does not create a duplicate for the same email+platform within 24h', async () => {
    const prisma = createPrismaMock();
    prisma.demoRequest.findFirst.mockResolvedValue({ id: 'existing' });
    const module = await Test.createTestingModule({
      providers: [
        DemoRequestsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    const service = module.get(DemoRequestsService);

    await service.create(valid);

    expect(prisma.demoRequest.create).not.toHaveBeenCalled();
  });

  it('persists a new lead with the consent version', async () => {
    const prisma = createPrismaMock();
    prisma.demoRequest.findFirst.mockResolvedValue(null);
    prisma.demoRequest.create.mockResolvedValue({ id: 'new' });
    const module = await Test.createTestingModule({
      providers: [
        DemoRequestsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    const service = module.get(DemoRequestsService);

    await service.create(valid);

    expect(prisma.demoRequest.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'ada@example.com',
        platform: 'financial-planner',
        consentVersion: 'v1',
      }),
    });
  });
});
