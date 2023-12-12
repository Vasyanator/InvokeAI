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
  const onReset = useCallback(() => {
    setValue(0);
  }, []);
  return (
    <Slider {...props} value={value} onChange={setValue} onReset={onReset} />
  );
};

export const Default: Story = {
  render: Component,
  args: {
    fineStep: 0.1,
    withThumbTooltip: true,
    formatValue: (v: number) => `${v} eggs`,
  },
};
