import {
  NumberDecrementStepper as ChakraNumberDecrementStepper,
  NumberIncrementStepper as ChakraNumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputStepper as ChakraNumberInputStepper,
  forwardRef,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import { NumberInputProps } from 'common/components/NumberInput/types';
import {
  $modifiers,
  useGlobalModifiersSetters,
} from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import {
  FocusEventHandler,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const isValidCharacter = (char: string) => /^[0-9\-.]$/i.test(char);

const NumberInput = forwardRef((props: NumberInputProps, ref) => {
  const {
    value,
    min,
    max,
    step: _step,
    fineStep: _fineStep,
    onChange: _onChange,
    isDisabled = false,
  } = props;

  const [valueAsString, setValueAsString] = useState<string>(String(value));
  const [valueAsNumber, setValueAsNumber] = useState<number>(value);
  const { setShift } = useGlobalModifiersSetters();
  const modifiers = useStore($modifiers);
  const step = useMemo(
    () => (modifiers.shift ? _fineStep ?? _step : _step),
    [modifiers.shift, _fineStep, _step]
  );
  const isInteger = useMemo(
    () => Number.isInteger(_step) && Number.isInteger(_fineStep ?? 1),
    [_step, _fineStep]
  );

  const onChange = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      setValueAsString(valueAsString);
      if (isNaN(valueAsNumber)) {
        return;
      }
      setValueAsNumber(valueAsNumber);
      _onChange(valueAsNumber);
    },
    [_onChange]
  );

  const onKeyUpDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      setShift(e.shiftKey);
    },
    [setShift]
  );

  const stepperOnClick = useCallback(
    () => _onChange(Number(valueAsString)),
    [_onChange, valueAsString]
  );

  const onBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.target.value) {
        onChange(String(min), min);
      }
    },
    [min, onChange]
  );

  /**
   * When `value` changes (e.g. from a diff source than this component), we need
   * to update the internal `valueAsString`, but only if the actual value is different
   * from the current value.
   */
  useEffect(() => {
    if (value !== valueAsNumber) {
      setValueAsString(String(value));
      setValueAsNumber(value);
    }
  }, [value, valueAsNumber]);

  console.log('NumberInput', { value, valueAsString, valueAsNumber });

  return (
    <ChakraNumberInput
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={valueAsString}
      onChange={onChange}
      onBlur={onBlur}
      isValidCharacter={isValidCharacter}
      focusInputOnChange={false}
      onPaste={stopPastePropagation}
      inputMode={isInteger ? 'numeric' : 'decimal'}
      isDisabled={isDisabled}
      precision={isInteger ? 0 : undefined}
    >
      <ChakraNumberInputField onKeyUp={onKeyUpDown} onKeyDown={onKeyUpDown} />
      <ChakraNumberInputStepper>
        <ChakraNumberIncrementStepper onClick={stepperOnClick} />
        <ChakraNumberDecrementStepper onClick={stepperOnClick} />
      </ChakraNumberInputStepper>
    </ChakraNumberInput>
  );
});

export default memo(NumberInput);
