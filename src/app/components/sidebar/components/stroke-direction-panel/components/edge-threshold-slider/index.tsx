import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const EdgeThresholdSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-edge-threshold', threshold: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.edgeThreshold}
      min={0}
      max={100}
      step={1}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default EdgeThresholdSlider;
