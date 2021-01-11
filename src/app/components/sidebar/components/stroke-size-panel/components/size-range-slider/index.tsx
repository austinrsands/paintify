import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import InclusiveRange from '../../../../../../../lib/structures/inclusive-range';
import { useAppContext } from '../../../../../../context';

const SizeRangeSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (typeof value === 'number') return;
    const range: InclusiveRange = { min: value[0], max: value[1] };
    dispatch({ type: 'update-quad-tree-size-range', range });
  };

  return (
    <ImprovedSlider
      initialValue={[state.quadTreeSizeRange.min, state.quadTreeSizeRange.max]}
      min={10}
      max={1000}
      step={10}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default SizeRangeSlider;
