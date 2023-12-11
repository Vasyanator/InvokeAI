import { SliderMark as ChakraSliderMark } from '@chakra-ui/react';
import { SystemStyleObject } from '@chakra-ui/styled-system';
import { MotionProps, motion } from 'framer-motion';
import { memo } from 'react';

export type SliderMarkProps = {
  value: number;
  label: string;
  index: number;
  total: number;
};

const initialFirstLast: MotionProps['initial'] = { opacity: 0, y: 10 };

const animate: MotionProps['animate'] = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.2, ease: 'easeOut' },
};

const exitFirstLast: MotionProps['exit'] = {
  opacity: 0,
  y: 10,
  transition: { duration: 0.2, ease: 'anticipate' },
};

const initialOther = { ...initialFirstLast, x: '-50%' };
const animateOther = { ...animate, x: '-50%' };
const exitOther = { ...exitFirstLast, x: '-50%' };

const firstMarkStyle: SystemStyleObject = {
  insetInlineStart: '0 !important',
  insetInlineEnd: 'unset !important',
};

const lastMarkStyle: SystemStyleObject = {
  insetInlineStart: 'unset !important',
  insetInlineEnd: '0 !important',
};

const SliderMark = ({ value, label, index, total }: SliderMarkProps) => {
  if (index === 0) {
    return (
      <ChakraSliderMark
        as={motion.div}
        initial={initialFirstLast}
        animate={animate}
        exit={exitFirstLast}
        key={value}
        value={value}
        sx={firstMarkStyle}
      >
        {label}
      </ChakraSliderMark>
    );
  }

  if (index === total - 1) {
    return (
      <ChakraSliderMark
        as={motion.div}
        initial={initialFirstLast}
        animate={animate}
        exit={exitFirstLast}
        key={value}
        value={value}
        sx={lastMarkStyle}
      >
        {label}
      </ChakraSliderMark>
    );
  }

  return (
    <ChakraSliderMark
      as={motion.div}
      initial={initialOther}
      animate={animateOther}
      exit={exitOther}
      key={value}
      value={value}
    >
      {label}
    </ChakraSliderMark>
  );
};

export default memo(SliderMark);
