import React from 'react';
import { Typography, TypographyProps } from '@material-ui/core';

const ReferenceImageUploadMessage: React.FC<TypographyProps> = (props) => (
  <Typography variant="subtitle2" color="textSecondary" {...props}>
    No image uploaded
  </Typography>
);

export default ReferenceImageUploadMessage;
