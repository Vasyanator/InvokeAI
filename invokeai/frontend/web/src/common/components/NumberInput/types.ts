export type NumberInputProps = {
  /**
   * The value
   */
  value: number;
  /**
   * The minimum value
   */
  min: number;
  /**
   * The maximum value
   */
  max: number;
  /**
   * The default step
   */
  step: number;
  /**
   * The fine step (used when shift is pressed)
   */
  fineStep?: number;
  /**
   * The change handler
   */
  onChange: (v: number) => void;
  /**
   * Whether the NumberInput is disabled
   */
  isDisabled?: boolean;
};
