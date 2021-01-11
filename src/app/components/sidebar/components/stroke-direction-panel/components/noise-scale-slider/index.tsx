import React from 'react';
import { useAppContext } from '../../../../../../context';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';

const NoiseScaleSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-noise-scale', scale: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.noiseScale}
      min={0.00001}
      max={0.003}
      step={0.00005}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default NoiseScaleSlider;
