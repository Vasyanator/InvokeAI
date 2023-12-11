import { Button } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from 'common/components/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    label: 'My Tooltip',
    placement: 'top',
    hasArrow: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const render = (props: Parameters<typeof Tooltip>[0]) => (
  <Tooltip {...props}>
    <Button>Invoke</Button>
  </Tooltip>
);

export const Default: Story = {
  render,
};

export const WithoutArrow: Story = {
  render,
  args: {
    hasArrow: false,
  },
};
