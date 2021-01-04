import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StyleProps from '../../util/style-props';

const PlayPauseButton: React.FC<StyleProps> = (props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleClick = () => setIsPlaying((prev) => !prev);

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label={isPlaying ? 'pause' : 'play'}
      {...props}
    >
      {isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
    </IconButton>
  );
};

export default PlayPauseButton;
