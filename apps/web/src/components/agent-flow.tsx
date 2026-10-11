'use client';

import * as React from 'react';

interface Agent {
  role: string;
  detail: string;
}

const AGENTS: Agent[] = [
  { role: 'Planner', detail: 'Breaks the goal into steps' },
  { role: 'Executor', detail: 'Carries out each step' },
  { role: 'Adapter', detail: 'Revises as conditions change' },
];

function Arrow() {
  return (
    <span className="text-accent" aria-hidden="true">
      &rarr;
    </span>
  );
}

/**
 * Decorative coordination diagram: generic agent roles → one goal. Text-only,
 * no third-party logos. The pulse animation is disabled under reduced motion.
 */
export function AgentFlow({ goal }: { goal: string }) {
  return (
    <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
      {AGENTS.map((agent, index) => (
        <React.Fragment key={agent.role}>
          {index > 0 ? <Arrow /> : null}
          <div
            className="flex w-56 flex-col gap-1 rounded-md border border-border bg-surface p-4 text-center shadow-sm animate-flow motion-reduce:animate-none"
            style={{ animationDelay: `${index * 300}ms` }}
          >
            <p className="font-semibold text-ink">{agent.role}</p>
            <p className="text-sm text-muted">{agent.detail}</p>
          </div>
        </React.Fragment>
      ))}
      <Arrow />
      <div className="flex w-56 flex-col gap-1 rounded-md border border-accent bg-accent-soft p-4 text-center">
        <p className="font-semibold text-ink">{goal}</p>
        <p className="text-sm text-muted">One coordinated outcome</p>
      </div>
    </div>
  );
}
