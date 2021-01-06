import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import StyleProps from '../../../../../lib/structures/style-props';
import { useAppContext } from '../../../../context';

const ResetButton: React.FC<StyleProps> = (props) => {
  const { state, dispatch } = useAppContext();
  const handleClick = () => dispatch({ type: 'reset' });

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
