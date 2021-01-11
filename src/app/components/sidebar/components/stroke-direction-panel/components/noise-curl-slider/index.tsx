import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const NoiseCurlSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-noise-curl', curl: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.noiseCurl}
      min={0.1}
      max={2}
      step={0.01}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default NoiseCurlSlider;
