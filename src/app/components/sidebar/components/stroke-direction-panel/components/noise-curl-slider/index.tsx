import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../../../../../context';

const NoiseCurlSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-noise-curl', curl: value });
  };

  return (
    <Slider
      value={state.noiseCurl}
      min={0.1}
      max={2}
      step={0.01}
      onChange={handleChange}
      {...props}
    />
  );
};

export default NoiseCurlSlider;
