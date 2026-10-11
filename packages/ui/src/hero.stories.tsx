import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';

const meta = {
  title: 'UI/Hero',
  component: Hero,
  args: {
    eyebrow: 'Prime Agentic',
    title: 'Four agentic platforms. One coordinated approach.',
    subtitle: 'AI that plans, executes, and adapts.',
    ctas: [{ label: 'Request a demo', href: '/contact' }],
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Centered: Story = { args: { align: 'center' } };
