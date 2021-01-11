import React, { useRef } from 'react';
import { Slider, SliderProps } from '@material-ui/core';

interface Props {
  initialValue?: number | Array<number>;
}

export type ImprovedSliderProps = Props & Omit<SliderProps, 'defaultValue'>;

/**
 * A simple slider component that allows uncontrolled sliders to specify default values based off of state
 */
const ImprovedSlider: React.FC<ImprovedSliderProps> = ({
  initialValue,
  ...rest
}) => {
  // Used to allow initial value to be based off of state without being updated with every change
  const initialValueRef = useRef(initialValue);

  return <Slider defaultValue={initialValueRef.current} {...rest} />;
};

export default ImprovedSlider;
