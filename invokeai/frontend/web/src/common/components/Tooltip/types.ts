import { Placement } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

export type TooltipProps = PropsWithChildren & {
  label: string | ReactNode;
  isOpen?: boolean;
  placement?: Placement;
  hasArrow?: boolean;
};
