import { Button as ChakraButton, forwardRef } from '@chakra-ui/react';
import { ButtonProps } from 'common/components/Button/types';
import { memo } from 'react';

const Button = forwardRef((props: ButtonProps, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraButton ref={ref} {...rest}>
      {children}
    </ChakraButton>
  );
});

export default memo(Button);
