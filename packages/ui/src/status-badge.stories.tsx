import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';

const meta = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InDevelopment: Story = { args: { status: 'In Development' } };
export const EarlyAccess: Story = { args: { status: 'Early Access' } };
export const Live: Story = { args: { status: 'Live' } };
