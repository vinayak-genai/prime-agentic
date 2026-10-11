import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './section-heading';

const meta = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  args: {
    eyebrow: 'Eyebrow',
    title: 'A section title',
    description: 'A short supporting description.',
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {};
export const Left: Story = { args: { align: 'left' } };
