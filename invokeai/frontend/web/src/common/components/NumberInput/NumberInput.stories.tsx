import type { Meta, StoryObj } from '@storybook/react';
import NumberInput from 'common/components/NumberInput/NumberInput';
import { useState } from 'react';

const meta: Meta<typeof NumberInput> = {
  title: 'NumberInput',
  tags: ['autodocs'],
  component: NumberInput,
  args: {
    min: -10,
    max: 10,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

const Component = (props: Parameters<typeof NumberInput>[0]) => {
  const [value, setValue] = useState(0);
  return <NumberInput {...props} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: Component,
  args: { fineStep: 0.1 },
};

export const Integer: Story = {
  render: Component,
};
