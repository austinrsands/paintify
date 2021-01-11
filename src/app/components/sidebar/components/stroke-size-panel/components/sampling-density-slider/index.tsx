import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../../../../../context';

const SamplingDensitySlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-quad-tree-sampling-density', density: value });
  };

  return (
    <Slider
      value={state.quadTreeSamplingDensity}
      min={0.00001}
      max={0.005}
      step={0.0001}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SamplingDensitySlider;
