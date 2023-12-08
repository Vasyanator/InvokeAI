import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const invokeAITrack = defineStyle(() => {
  return {
    bg: 'base.600',
    h: 1.5,
  };
});

const invokeAIFilledTrack = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.600`,
    h: 1.5,
  };
});

const invokeAIThumb = defineStyle((props) => {
  return {
    w: props.orientation === 'horizontal' ? 2 : 4,
    h: props.orientation === 'horizontal' ? 4 : 2,
    bg: 'base.100',
  };
});

const invokeAIMark = defineStyle(() => {
  return {
    fontSize: '2xs',
    fontWeight: '500',
    color: 'base.400',
    mt: 2,
    insetInlineStart: 'unset',
  };
});

const invokeAI = definePartsStyle((props) => ({
  container: {
    _disabled: {
      opacity: 0.6,
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  track: invokeAITrack(),
  filledTrack: invokeAIFilledTrack(props),
  thumb: invokeAIThumb(props),
  mark: invokeAIMark(),
}));

export const sliderTheme = defineMultiStyleConfig({
  variants: { invokeAI },
  defaultProps: {
    variant: 'invokeAI',
    colorScheme: 'accent',
  },
});
