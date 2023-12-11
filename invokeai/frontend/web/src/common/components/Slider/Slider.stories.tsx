import type { Meta, StoryObj } from '@storybook/react';
import Slider from 'common/components/Slider/Slider';
import { useCallback, useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Slider',
  tags: ['autodocs'],
  component: Slider,
  args: {
    min: 0,
    max: 10,
    step: 1,
    marks: [0, 5, 10],
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const Component = (props: Parameters<typeof Slider>[0]) => {
  const [value, setValue] = useState(0);
  return <Slider {...props} value={value} onChange={setValue} />;
};

const ComponentWithReset = (props: Parameters<typeof Slider>[0]) => {
  const [value, setValue] = useState(0);
  const onReset = useCallback(() => {
    setValue(0);
  }, []);
  return (
    <Slider {...props} value={value} onChange={setValue} onReset={onReset} />
  );
};

export const WithTooltip: Story = {
  render: Component,
  args: {
    withTooltip: true,
  },
};

export const WithFormattedValues: Story = {
  render: Component,
  args: {
    withTooltip: true,
    formatValue: (v: number) => `${v} eggs`,
  },
};

export const WithReset: Story = {
  render: ComponentWithReset,
};

export const FloatValue: Story = {
  render: Component,
  args: {
    min: 0,
    max: 1,
    step: 0.1,
    marks: [0, 0.5, 1],
  },
};

export const WithFineStep: Story = {
  name: 'With Fine Step (hold shift)',
  render: Component,
  args: {
    fineStep: 0.1,
  },
};
