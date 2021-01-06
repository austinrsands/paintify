import React from 'react';
import { IconButton } from '@material-ui/core';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import StyleProps from '../../../../../lib/structures/style-props';
import { useAppContext } from '../../../../context';

const SaveButton: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  const handleClick = () => {
    // TODO: implement save
  };

  return (
    <IconButton
      size="medium"
      onClick={handleClick}
      aria-label="save image"
      disabled={!state.imageData}
      {...props}
    >
      <SaveAltRoundedIcon />
    </IconButton>
  );
};

export default SaveButton;
