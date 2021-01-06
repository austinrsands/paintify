import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

const ReferenceImageUploadMessage: React.FC<TypographyProps> = (props) => (
  <Typography variant="subtitle2" color="textSecondary" {...props}>
    Upload an image to begin
  </Typography>
);

export default ReferenceImageUploadMessage;
