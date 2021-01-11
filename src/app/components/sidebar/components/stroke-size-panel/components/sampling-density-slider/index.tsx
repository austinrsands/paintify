import React, { useRef } from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const SamplingDensitySlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();
  const defaultValueRef = useRef(state.quadTreeSamplingDensity);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-quad-tree-sampling-density', density: value });
  };

  return (
    <ImprovedSlider
      initialValue={defaultValueRef.current}
      min={0.00001}
      max={0.005}
      step={0.0001}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default SamplingDensitySlider;
