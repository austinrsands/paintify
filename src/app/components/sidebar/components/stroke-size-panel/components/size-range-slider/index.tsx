import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import InclusiveRange from '../../../../../../../lib/structures/inclusive-range';
import { useAppContext } from '../../../../../../context';

const SizeRangeSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (typeof value === 'number') return;
    const range: InclusiveRange = { min: value[0], max: value[1] };
    dispatch({ type: 'update-quad-tree-size-range', range });
  };

  return (
    <Slider
      value={[state.quadTreeSizeRange.min, state.quadTreeSizeRange.max]}
      min={10}
      max={1000}
      step={10}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SizeRangeSlider;
