import React from 'react';
import { IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StyleProps from '../../../../util/style-props';
import { useAppContext } from '../../../../context';

const PlayPauseButton: React.FC<StyleProps> = (props) => {
  const { state, dispatch } = useAppContext();

  const handleClick = () => dispatch({ type: 'toggle-paint' });

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label={state.isPainting ? 'pause' : 'play'}
      disabled={!state.imageData}
      {...props}
    >
      {state.isPainting ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
