import React from 'react';
import ImprovedSlider, {
  ImprovedSliderProps,
} from '../../../../../../../lib/components/improved-slider';
import { useAppContext } from '../../../../../../context';

const StrokeLengthSlider: React.FC<ImprovedSliderProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => {
    if (value instanceof Array) return;
    dispatch({ type: 'update-stroke-length-ratio', ratio: value });
  };

  return (
    <ImprovedSlider
      initialValue={state.strokeLengthRatio}
      min={1}
      max={10}
      step={1}
      onChangeCommitted={handleChange}
      {...props}
    />
  );
};

export default StrokeLengthSlider;
