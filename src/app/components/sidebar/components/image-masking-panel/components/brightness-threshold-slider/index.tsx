import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import InclusiveRange from '../../../../../../../lib/structures/inclusive-range';
import { useAppContext } from '../../../../../../context';

const BrightnessThresholdSlider: React.FC<ImprovedSliderProps> = (props) => {
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
    <ImprovedSlider
      initialValue={[state.brightnessRange.min, state.brightnessRange.max]}
      min={0}
      max={255}
      step={1}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default BrightnessThresholdSlider;
