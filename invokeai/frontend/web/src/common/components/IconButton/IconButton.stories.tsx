import type { Meta, StoryObj } from '@storybook/react';
import IconButton from 'common/components/IconButton/IconButton';
import { FaBoltLightning } from 'react-icons/fa6';

const meta: Meta<typeof IconButton> = {
  title: 'IconButton',
  tags: ['autodocs'],
  component: IconButton,
  args: {
    icon: <FaBoltLightning />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const Component = (props: Parameters<typeof IconButton>[0]) => {
  return <IconButton {...props} />;
};

export const Default: Story = {
  render: Component,
};
