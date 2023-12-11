import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import { memo } from 'react';

type TooltipProps = ChakraTooltipProps;

const Tooltip = (props: TooltipProps) => {
  const { children, hasArrow = true, placement = 'top', ...rest } = props;
  return (
    <ChakraTooltip hasArrow={hasArrow} placement={placement} {...rest}>
      {children}
    </ChakraTooltip>
  );
};

export default memo(Tooltip);
