import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const SubdivisionThresholdSlider: React.FC<ImprovedSliderProps> = (props) => {
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
    <ImprovedSlider
      initialValue={state.quadTreeSubdivisionThreshold}
      min={0}
      max={50}
      step={0.5}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default SubdivisionThresholdSlider;
