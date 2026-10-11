import type { Meta, StoryObj } from '@storybook/react';
import { PlatformCard } from './platform-card';

const meta = {
  title: 'UI/PlatformCard',
  component: PlatformCard,
  args: {
    name: 'Financial Planner & Wealth Management',
    tagline: 'Personalized financial planning, continuously updated.',
    status: 'In Development',
    href: '/platforms/financial-planner',
  },
} satisfies Meta<typeof PlatformCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EarlyAccess: Story = { args: { status: 'Early Access' } };
