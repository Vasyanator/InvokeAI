import SliderMark from 'common/components/Slider/SliderMark';
import { memo, useMemo } from 'react';

export type SliderMarksProps = {
  marks: number[];
  formatValue: (v: number) => string;
};

const isNumberArray = (marks: SliderMarksProps['marks']): marks is number[] => {
  return typeof marks[0] === 'number';
};

const SliderMarks = ({ marks: _marks, formatValue }: SliderMarksProps) => {
  const marks = useMemo<{ value: number; label: string }[]>(() => {
    if (isNumberArray(_marks)) {
      return _marks.map((m) => ({ value: m, label: formatValue(m) }));
    }
    return _marks;
  }, [_marks, formatValue]);
  return (
    <>
      {marks.map((m, i) => (
        <SliderMark
          key={m.value}
          value={m.value}
          label={m.label}
          index={i}
          total={marks.length}
        />
      ))}
    </>
  );
};

export default memo(SliderMarks);
