import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import StyleProps from '../../../../../lib/structures/style-props';
import { useAppContext } from '../../../../context';
import { fillBackground } from '../../../../../util/drawing/background';

const ResetButton: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();
  const handleClick = () => {
    // Clear the painting
    if (!state.paintingContext) return;
    state.paintingContext.fillStyle = 'white';
    fillBackground(state.paintingContext);
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label="replay"
      disabled={!state.imageData}
      {...props}
    >
      <ReplayRoundedIcon />
    </IconButton>
  );
};

export default ResetButton;
