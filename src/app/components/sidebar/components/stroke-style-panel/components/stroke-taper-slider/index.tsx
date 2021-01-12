import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const StrokeTaperSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-stroke-taper', taper: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.strokeTaper}
      min={0}
      max={1}
      step={0.001}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default StrokeTaperSlider;
