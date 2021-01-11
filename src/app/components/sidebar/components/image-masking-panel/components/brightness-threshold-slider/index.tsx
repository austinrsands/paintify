import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import InclusiveRange from '../../../../../../../lib/structures/inclusive-range';
import { useAppContext } from '../../../../../../context';

const BrightnessThresholdSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (typeof value === 'number') return;
    const range: InclusiveRange = { min: value[0], max: value[1] };
    dispatch({ type: 'update-brightness-range', range });
  };

  return (
    <Slider
      value={[state.brightnessRange.min, state.brightnessRange.max]}
      min={0}
      max={255}
      step={1}
      onChange={handleChange}
      {...props}
    />
  );
};

export default BrightnessThresholdSlider;
