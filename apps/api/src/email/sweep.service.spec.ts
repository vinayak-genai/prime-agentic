import { describe, expect, it, vi } from 'vitest';
import { SweepService } from './sweep.service.js';

const lead = {
  id: '1',
  name: 'Ada',
  email: 'ada@example.com',
  company: 'Acme',
  role: null,
  platform: 'financial-planner',
  message: 'hi',
  consentVersion: 'v1',
  consentAt: new Date(),
  emailStatus: 'sending',
  attempts: 0,
  nextAttemptAt: null,
  lastError: null,
  createdAt: new Date(),
  deleteAt: null,
};

function makeMocks() {
  const prisma = {
    demoRequest: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      findMany: vi.fn().mockResolvedValue([lead]),
      update: vi.fn().mockResolvedValue({}),
    },
  };
  const email = {
    sendNotification: vi.fn().mockResolvedValue(undefined),
    sendConfirmation: vi.fn().mockResolvedValue(undefined),
  };
  return { prisma, email };
}

describe('SweepService', () => {
  it('claims pending rows, sends, and marks them sent', async () => {
    const { prisma, email } = makeMocks();
    const sweep = new SweepService(prisma as never, email as never);
    await sweep.run();

    expect(prisma.demoRequest.updateMany).toHaveBeenCalled();
    expect(email.sendNotification).toHaveBeenCalledWith(lead);
    expect(prisma.demoRequest.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ emailStatus: 'sent' }),
      }),
    );
  });

  it('marks a row pending with backoff when sending fails', async () => {
    const { prisma, email } = makeMocks();
    email.sendNotification.mockRejectedValue(new Error('boom'));
    const sweep = new SweepService(prisma as never, email as never);
    await sweep.run();

    expect(prisma.demoRequest.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          emailStatus: 'pending',
          attempts: 1,
          lastError: 'boom',
          nextAttemptAt: expect.any(Date),
        }),
      }),
    );
  });

  it('marks a row failed once attempts reach the cap', async () => {
    const { prisma, email } = makeMocks();
    prisma.demoRequest.findMany.mockResolvedValue([{ ...lead, attempts: 4 }]);
    email.sendNotification.mockRejectedValue(new Error('boom'));
    const sweep = new SweepService(prisma as never, email as never);
    await sweep.run();

    expect(prisma.demoRequest.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ emailStatus: 'failed', attempts: 5 }),
      }),
    );
  });
});
