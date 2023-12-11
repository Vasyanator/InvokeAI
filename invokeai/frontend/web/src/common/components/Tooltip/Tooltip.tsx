import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { TooltipProps } from 'common/components/Tooltip/types';
import { memo } from 'react';

const Tooltip = (props: TooltipProps) => {
  const { children, hasArrow = true, placement = 'top', ...rest } = props;
  return (
    <ChakraTooltip hasArrow={hasArrow} placement={placement} {...rest}>
      {children}
    </ChakraTooltip>
  );
};

export default memo(Tooltip);
