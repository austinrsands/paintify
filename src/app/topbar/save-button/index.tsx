import React from 'react';
import { IconButton } from '@material-ui/core';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import StyleProps from '../../util/style-props';

const SaveButton: React.FC<StyleProps> = (props) => {
  const handleClick = () => {};

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label="save image"
      {...props}
    >
      <SaveAltRoundedIcon />
    </IconButton>
  );
};

export default SaveButton;
