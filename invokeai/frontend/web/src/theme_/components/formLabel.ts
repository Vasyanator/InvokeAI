import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle(() => {
  return {
    fontSize: 'sm',
    marginEnd: 0,
    mb: 1,
    fontWeight: '400',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    whiteSpace: 'nowrap',
    _disabled: {
      opacity: 0.4,
    },
    color: 'base.300',
    _invalid: {
      color: 'error.300',
    },
  };
});

export const formLabelTheme = defineStyleConfig({
  baseStyle,
});
