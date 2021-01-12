import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const StrokeLiftSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-stroke-lift', lift: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.strokeLift}
      min={0}
      max={1}
      step={0.001}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default StrokeLiftSlider;
