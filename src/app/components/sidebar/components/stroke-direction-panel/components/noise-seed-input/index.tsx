import {
  IconButton,
  Input,
  InputAdornment,
  InputProps,
} from '@material-ui/core';
import CasinoRounded from '@material-ui/icons/CasinoRounded';
import React from 'react';
import { randomSeed } from '../../../../../../../util/math';
import { useAppContext } from '../../../../../../context';

const NoiseSeedInput: React.FC<InputProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleRandomizeSeed = () => {
    dispatch({ type: 'update-noise-seed', seed: randomSeed() });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch({ type: 'update-noise-seed', seed: event.target.value });
  };

  return (
    <Input
      color="primary"
      value={state.noiseSeed}
      spellCheck={false}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={handleRandomizeSeed}
            onMouseDown={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => event.preventDefault()}
          >
            <CasinoRounded />
          </IconButton>
        </InputAdornment>
      }
      onChange={handleChange}
      {...props}
    />
  );
};

export default NoiseSeedInput;
