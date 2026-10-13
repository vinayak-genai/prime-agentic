import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';

@Injectable()
class LoggerService {
  log(): string {
    return 'logged';
  }
}

@Injectable()
class OrderService {
  constructor(readonly logger: LoggerService) {}

  place(): string {
    return this.logger.log();
  }
}

describe('Nest DI smoke test (ESM)', () => {
  it('resolves a service and its injected dependency through the DI container', async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrderService, LoggerService],
    }).compile();

    const order = moduleRef.get(OrderService);
    expect(order).toBeInstanceOf(OrderService);
    expect(order.logger).toBeInstanceOf(LoggerService);
    expect(order.place()).toBe('logged');
  });

  it('emits design:paramtypes metadata for decorated classes', () => {
    const params = Reflect.getMetadata('design:paramtypes', OrderService);
    expect(params).toEqual([LoggerService]);
  });
});
