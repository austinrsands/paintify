import React from 'react';
import { IconButton } from '@material-ui/core';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import StyleProps from '../../util/style-props';

const ReplayButton: React.FC<StyleProps> = (props) => {
  const handleClick = () => {};

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label="replay"
      {...props}
    >
      <ReplayRoundedIcon />
    </IconButton>
  );
};

export default ReplayButton;
