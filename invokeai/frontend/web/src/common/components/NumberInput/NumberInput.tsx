import {
  NumberDecrementStepper as ChakraNumberDecrementStepper,
  NumberIncrementStepper as ChakraNumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField as ChakraNumberInputField,
  NumberInputStepper as ChakraNumberInputStepper,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import { NumberInputProps } from 'common/components/NumberInput/types';
import {
  $modifiers,
  useGlobalModifiersSetters,
} from 'common/hooks/useGlobalModifiers';
import { stopPastePropagation } from 'common/util/stopPastePropagation';
import { KeyboardEvent, memo, useCallback, useMemo, useState } from 'react';

const NumberInput = (props: NumberInputProps) => {
  const {
    value,
    min,
    max,
    step: _step,
    fineStep: _fineStep,
    onChange: _onChange,
    ...rest
  } = props;

  /**
   * Using a controlled input with a value that accepts decimals needs special
   * handling. If the user starts to type in "1.5", by the time they press the
   * 5, the value has been parsed from "1." to "1" and they end up with "15".
   *
   * To resolve this, this component keeps a the value as a string internally,
   * and the UI component uses that. When a change is made, that string is parsed
   * as a number and given to the `onChange` function.
   */

  const [valueAsString, setValueAsString] = useState<string>(String(value));

  const modifiers = useStore($modifiers);

  const isInteger = useMemo(
    () => Number.isInteger(_step) && Number.isInteger(_fineStep ?? 1),
    [_step, _fineStep]
  );

  /**
   * When `value` changes (e.g. from a diff source than this component), we need
   * to update the internal `valueAsString`, but only if the actual value is different
   * from the current value.
   */
  // useEffect(() => {
  //   if (
  //     !valueAsString.match(decimalOrSignRegex) &&
  //     value !== Number(valueAsString)
  //   ) {
  //     setValueAsString(String(value));
  //   }
  // }, [value, valueAsString]);

  // // /**
  //  * Clicking the steppers allows the value to go outside bounds; we need to
  //  * clamp it on blur and floor it if needed.
  //  */
  // const onBlur = useCallback(
  //   (e: FocusEvent<HTMLInputElement>) => {
  //     const v = e.target.value;
  //     console.log('blur', v);
  //     if (!isNaN(Number(v))) {
  //       return;
  //     }
  //     const clamped = clamp(
  //       isInteger ? Math.floor(Number(v)) : Number(v),
  //       min,
  //       max
  //     );
  //     setValueAsString(String(clamped));
  //     _onChange(clamped);
  //   },
  //   [_onChange, isInteger, max, min]
  // );

  // const onChange = useCallback(
  //   (valueAsString: string, valueAsNumber: number) => {
  //     console.log('change', valueAsString);
  //     setValueAsString(valueAsString);
  //     // This allows negatives and decimals e.g. '-123', `.5`, `-0.2`, etc.
  //     // if (!isNaN(Number(v))) {
  //     //   // Cast the value to number. Floor it if it should be an integer.
  //     //   _onChange(isInteger ? Math.floor(Number(v)) : Number(v));
  //     // }
  //     // if (!v.match(decimalOrSignRegex)) {
  //     //   // Cast the value to number. Floor it if it should be an integer.
  //     //   _onChange(isInteger ? Math.floor(Number(v)) : Number(v));
  //     // }
  //   },
  //   []
  // );

  const onChange = useCallback(
    (valueAsString: string, valueAsNumber: number) => {
      console.log('change', valueAsString);
      setValueAsString(valueAsString);
    },
    []
  );

  const { setShift } = useGlobalModifiersSetters();

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

  const step = useMemo(
    () => (modifiers.shift ? _fineStep ?? _step : _step),
    [modifiers.shift, _fineStep, _step]
  );

  console.log({ step, isInteger });

  return (
    <ChakraNumberInput
      min={min}
      max={max}
      step={step}
      value={valueAsString}
      onChange={onChange}
      // onBlur={onBlur}
      focusInputOnChange={false}
      onPaste={stopPastePropagation}
      inputMode={isInteger ? 'numeric' : 'decimal'}
      precision={isInteger ? 0 : 3}
      {...rest}
    >
      <ChakraNumberInputField onKeyUp={onKeyUpDown} onKeyDown={onKeyUpDown} />
      <ChakraNumberInputStepper>
        <ChakraNumberIncrementStepper onClick={stepperOnClick} />
        <ChakraNumberDecrementStepper onClick={stepperOnClick} />
      </ChakraNumberInputStepper>
    </ChakraNumberInput>
  );
};

export default memo(NumberInput);
