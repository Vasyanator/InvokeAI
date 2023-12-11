export type SliderProps = {
  /**
   * The value (controlled)
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
   * The fine step (when shift is pressed)
   */
  fineStep?: number;
  /**
   * The change handler
   */
  onChange: (v: number) => void;
  /**
   * The reset handler
   */
  onReset?: () => void;
  /**
   * The value formatter
   */
  formatValue?: (v: number) => string;
  /**
   * The minimum value for the input field
   */
  inputMin?: number;
  /**
   * The maximum value for the input field
   */
  inputMax?: number;
  /**
   * Whether the slider is disabled
   */
  isDisabled?: boolean;
  /**
   * The marks to render below the slider
   */
  marks?: number[];
  /**
   * Whether to show a tooltip over the slider thumb
   */
  withTooltip?: boolean;
};

export type FormattedMark = { value: number; label: string };
