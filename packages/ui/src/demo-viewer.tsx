'use client';

import * as React from 'react';
import { Button } from './button';

export interface DemoStep {
  title: string;
  description: string;
}

export interface DemoViewerDemo {
  persona: { name: string; detail: string };
  steps: DemoStep[];
}

export interface DemoViewerProps {
  demo: DemoViewerDemo;
  title?: string;
  className?: string;
}

/** Interactive mock-demo walkthrough: step-through with Next/Back, no autoplay. */
export function DemoViewer({
  demo,
  title = 'Interactive demo',
  className,
}: DemoViewerProps) {
  const [stepIndex, setStepIndex] = React.useState(0);
  const total = demo.steps.length;
  const step = demo.steps[stepIndex];

  if (!step) return null;

  const goTo = (next: number) =>
    setStepIndex(Math.max(0, Math.min(total - 1, next)));

  return (
    <div
      className={`rounded-lg border border-border bg-surface p-6 ${className ?? ''}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
          Mock demo, illustrative data
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-muted">
        <span className="font-medium text-ink">{demo.persona.name}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{demo.persona.detail}</span>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          Step {stepIndex + 1} of {total}
        </p>
        <h4 className="mt-2 text-lg font-semibold text-ink">{step.title}</h4>
        <p className="mt-2 text-muted">{step.description}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          disabled={stepIndex === 0}
          onClick={() => goTo(stepIndex - 1)}
        >
          Back
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={stepIndex === total - 1}
          onClick={() => goTo(stepIndex + 1)}
        >
          Next
        </Button>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Step ${stepIndex + 1} of ${total}: ${step.title}`}
      </div>
    </div>
  );
}
