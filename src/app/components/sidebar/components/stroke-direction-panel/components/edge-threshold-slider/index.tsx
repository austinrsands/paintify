import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../../../../../context';

const EdgeThresholdSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-edge-threshold', threshold: value });
  };

  return (
    <Slider
      value={state.edgeThreshold}
      min={-255}
      max={255}
      step={1}
      onChange={handleChange}
      {...props}
    />
  );
};

export default EdgeThresholdSlider;
