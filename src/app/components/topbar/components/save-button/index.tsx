import React from 'react';
import { IconButton } from '@material-ui/core';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import StyleProps from '../../../../../util/structures/style-props';
import { useAppContext } from '../../../../context';

const SaveButton: React.FC<StyleProps> = (props) => {
  const { state } = useAppContext();

  const handleClick = async () => {
    if (!state.paintingContext) return;

    // Download painting as image
    const blob = await state.paintingContext.canvas.convertToBlob();
    const url = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'painting.png');
    document.body.appendChild(link);
    link.click();
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
