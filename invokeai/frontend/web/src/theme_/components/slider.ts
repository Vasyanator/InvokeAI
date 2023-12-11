import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const track = defineStyle(() => {
  return {
    bg: 'base.600',
    h: 2,
  };
});

const filledTrack = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.600`,
    h: 2,
  };
});

const thumb = defineStyle(() => {
  return {
    w: 4,
    h: 4,
    bg: 'accent.400',
    borderRadius: 'full',
    borderColor: 'base.200',
    borderWidth: 3,
    _hover: {
      transform: `translateY(-50%) scale(1.15)`,
      transition: 'transform 0.1s',
      _active: {
        transform: `translateY(-50%) scale(1.22)`,
        transition: 'transform 0.05s',
      },
    },
  };
});

const mark = defineStyle(() => {
  return {
    fontSize: '2xs',
    fontWeight: '500',
    color: 'base.400',
    mt: 2,
  };
});

const baseStyle = definePartsStyle((props) => ({
  container: {
    _disabled: {
      opacity: 0.6,
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  track: track(),
  filledTrack: filledTrack(props),
  thumb: thumb(),
  mark: mark(),
}));

export const sliderTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    colorScheme: 'accent',
  },
});
