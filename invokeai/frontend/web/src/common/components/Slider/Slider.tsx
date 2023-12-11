import {
  Slider as ChakraSlider,
  SliderFilledTrack as ChakraSliderFilledTrack,
  SliderThumb as ChakraSliderThumb,
  SliderTrack as ChakraSliderTrack,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import SliderMark from 'common/components/Slider/SliderMark';
import { FormattedMark, SliderProps } from 'common/components/Slider/types';
import { Tooltip } from 'common/components/Tooltip';
import { $modifiers } from 'common/hooks/useGlobalModifiers';
import { AnimatePresence } from 'framer-motion';
import { memo, useCallback, useMemo, useState } from 'react';

const Slider = (props: SliderProps) => {
  const {
    value,
    min,
    max,
    step: _step,
    fineStep: _fineStep,
    onChange,
    onReset,
    formatValue = (v: number) => v.toString(),
    marks: _marks,
    inputMin: _inputMin,
    inputMax: _inputMax,
    isDisabled = false,
    withTooltip = false,
  } = props;
  const [isMouseOverSlider, setIsMouseOverSlider] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const modifiers = useStore($modifiers);
  const step = useMemo(
    () => (modifiers.shift ? _fineStep ?? _step : _step),
    [modifiers.shift, _fineStep, _step]
  );

  const label = useMemo(() => formatValue(value), [formatValue, value]);

  const onMouseEnter = useCallback(() => setIsMouseOverSlider(true), []);
  const onMouseLeave = useCallback(() => setIsMouseOverSlider(false), []);
  const onChangeStart = useCallback(() => setIsChanging(true), []);
  const onChangeEnd = useCallback(() => setIsChanging(false), []);

  const marks = useMemo<FormattedMark[]>(
    () => _marks?.map((m) => ({ value: m, label: formatValue(m) })) ?? [],
    [_marks, formatValue]
  );
  return (
    <ChakraSlider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      focusThumbOnChange={false}
      isDisabled={isDisabled}
      onChangeStart={onChangeStart}
      onChangeEnd={onChangeEnd}
    >
      <AnimatePresence>
        {marks?.length &&
          (isMouseOverSlider || isChanging) &&
          marks.map((m, i) => (
            <SliderMark
              key={m.value}
              value={m.value}
              label={m.label}
              index={i}
              total={marks.length}
            />
          ))}
      </AnimatePresence>

      <ChakraSliderTrack>
        <ChakraSliderFilledTrack />
      </ChakraSliderTrack>

      <Tooltip
        isOpen={withTooltip && (isMouseOverSlider || isChanging)}
        label={label}
      >
        <ChakraSliderThumb onDoubleClick={onReset} zIndex={0} />
      </Tooltip>
    </ChakraSlider>
  );
};

export default memo(Slider);
