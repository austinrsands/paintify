import React from 'react';
import { Button } from '@material-ui/core';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import StyleProps from '../../../../../../../lib/structures/style-props/index';
import { useAppContext } from '../../../../../../context';

const getData = (bitmap: ImageBitmap): ImageData | null => {
  // Create offscreen canvas and store its context
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const context = canvas.getContext('2d');

  // Draw image onto canvas and return the image data.
  if (context != null) {
    context.drawImage(bitmap, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }
  return null;
};

const ReferenceImageUploadButton: React.FC<StyleProps> = (props) => {
  const { dispatch } = useAppContext();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Store file
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    // Extract image data
    const bitmap = await createImageBitmap(file);
    const data = getData(bitmap);
    bitmap.close();

    // Send data to context
    if (data) dispatch({ type: 'update-image-data', data });

    // Allow same file to be uploaded again
    event.target.value = '';
  };

  return (
    <Button color="primary" variant="contained" component="label" {...props}>
      <CloudUploadRoundedIcon />
      <input
        type="file"
        accept="image/jpeg, image/png"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </Button>
  );
};

export default ReferenceImageUploadButton;
