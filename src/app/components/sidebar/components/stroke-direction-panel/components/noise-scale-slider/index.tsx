import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../../../../../context';

const NoiseScaleSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-noise-scale', scale: value });
  };

  return (
    <Slider
      value={state.noiseScale}
      min={0.00001}
      max={0.003}
      step={0.00005}
      onChange={handleChange}
      {...props}
    />
  );
};

export default NoiseScaleSlider;
