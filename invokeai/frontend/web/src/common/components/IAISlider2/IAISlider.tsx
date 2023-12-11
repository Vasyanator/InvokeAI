import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import IAIIconButton from 'common/components/IAIIconButton';
import IAISliderMarks from 'common/components/IAISlider2/IAISliderMarks';
import { IAISliderProps } from 'common/components/IAISlider2/types';
import {
  $modifierHotkeys,
  useGlobalModifierHotkeysSetters,
} from 'common/hooks/useGlobalModifierHotkeys';
import { roundDownToMultiple } from 'common/util/roundDownToMultiple';
import { AnimatePresence } from 'framer-motion';
import { clamp } from 'lodash-es';
import {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowsRotate } from 'react-icons/fa6';

const IAISlider = (props: IAISliderProps) => {
  const {
    label,
    value,
    min,
    max,
    step: _step,
    fineStep: _fineStep,
    onChange,
    onReset,
    formatValue = (v: number) => v.toString(),
    marks,
    withInput = false,
    inputMin: _inputMin,
    inputMax: _inputMax,
    isDisabled = false,
    withTooltip = false,
    formControlProps,
    formLabelProps,
    numberInputProps,
  } = props;
  const { t } = useTranslation();
  const [isMouseOverSlider, setIsMouseOverSlider] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    String(value)
  );
  const modifiers = useStore($modifierHotkeys);

  const isInteger = useMemo(
    () => Number.isInteger(_step) && Number.isInteger(_fineStep),
    [_step, _fineStep]
  );

  useEffect(() => {
    // Must use an effect to update `inputValue`, because `value` may be changed by some external source
    setInputValue(value);
  }, [value]);

  const inputMin = useMemo(() => _inputMin ?? min, [_inputMin, min]);

  const inputMax = useMemo(() => _inputMax ?? max, [_inputMax, max]);

  const inputOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        e.target.value = String(inputMin);
      }
      const clamped = clamp(
        isInteger ? Math.floor(Number(e.target.value)) : Number(inputValue),
        inputMin,
        inputMax
      );
      const quantized = roundDownToMultiple(clamped, _step);
      onChange(quantized);
      setInputValue(quantized);
    },
    [isInteger, inputValue, inputMin, inputMax, _step, onChange]
  );

  const inputOnChange = useCallback((v: number | string) => {
    setInputValue(v);
  }, []);

  const inputForceBlur = useCallback((e: MouseEvent) => {
    if (e.target instanceof HTMLDivElement) {
      e.target.focus();
    }
  }, []);

  const { setShift } = useGlobalModifierHotkeysSetters();

  const onKeyUpDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      setShift(e.shiftKey);
    },
    [setShift]
  );

  const stepperOnClick = useCallback(
    () => onChange(Number(inputValue)),
    [inputValue, onChange]
  );

  const step = useMemo(
    () => (modifiers.shift ? _fineStep ?? _step : _step),
    [modifiers.shift, _fineStep, _step]
  );

  const tooltip = useMemo(() => formatValue(value), [formatValue, value]);

  const onMouseEnter = useCallback(() => setIsMouseOverSlider(true), []);
  const onMouseLeave = useCallback(() => setIsMouseOverSlider(false), []);
  const onChangeStart = useCallback(() => setIsChanging(true), []);
  const onChangeEnd = useCallback(() => setIsChanging(false), []);

  return (
    <FormControl
      onClick={inputForceBlur}
      isDisabled={isDisabled}
      {...formControlProps}
    >
      <FormLabel {...formLabelProps} pe={onReset ? 1 : 2}>
        {label}
        {onReset && (
          <IAIIconButton
            size="xs"
            variant="ghost"
            aria-label={t('accessibility.reset')}
            icon={<FaArrowsRotate />}
            isDisabled={isDisabled}
            onClick={onReset}
          />
        )}
      </FormLabel>
      <Slider
        aria-label={label}
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
          {marks?.length && (isMouseOverSlider || isChanging) && (
            <IAISliderMarks marks={marks} formatValue={formatValue} />
          )}
        </AnimatePresence>

        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>

        <Tooltip
          hasArrow
          placement="top"
          isOpen={(isMouseOverSlider || isChanging) && withTooltip}
          label={tooltip}
        >
          <SliderThumb onDoubleClick={onReset} zIndex={0} />
        </Tooltip>
      </Slider>

      {withInput && (
        <NumberInput
          min={inputMin}
          max={inputMax}
          step={step}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={inputOnBlur}
          focusInputOnChange={false}
          {...numberInputProps}
        >
          <NumberInputField onKeyUp={onKeyUpDown} onKeyDown={onKeyUpDown} />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={stepperOnClick} />
            <NumberDecrementStepper onClick={stepperOnClick} />
          </NumberInputStepper>
        </NumberInput>
      )}
    </FormControl>
  );
};

export default memo(IAISlider);
