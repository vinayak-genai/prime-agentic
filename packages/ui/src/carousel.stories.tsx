import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './carousel';

const slides = ['One', 'Two', 'Three', 'Four', 'Five'].map((text) => (
  <div
    key={text}
    className="flex h-48 items-center justify-center rounded-md bg-accent-soft text-2xl text-ink"
  >
    {text}
  </div>
));

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  args: {
    items: slides,
    ariaLabel: 'Demo carousel',
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cards: Story = { args: { variant: 'cards' } };
export const Hero: Story = { args: { variant: 'hero', autoplay: true } };
export const Logos: Story = {
  args: {
    variant: 'logos',
    autoplay: true,
    showDots: false,
    showArrows: false,
  },
};
export const StoryVariant: Story = { args: { variant: 'story' } };
