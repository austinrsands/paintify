import { Slider, SliderProps } from '@material-ui/core';
import React from 'react';
import { useAppContext } from '../../../../../../context';

const SubdivisionThresholdSlider: React.FC<SliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({
      type: 'update-quad-tree-subdivision-threshold',
      threshold: value,
    });
  };

  return (
    <Slider
      value={state.quadTreeSubdivisionThreshold}
      min={0}
      max={50}
      step={0.5}
      onChange={handleChange}
      {...props}
    />
  );
};

export default SubdivisionThresholdSlider;
