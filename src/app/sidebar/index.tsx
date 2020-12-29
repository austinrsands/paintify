import React, { useState } from 'react';
import { Box, BoxProps, makeStyles, Tabs } from '@material-ui/core';
import clsx from 'clsx';
import { ImageUploadPanel, ImageUploadTab } from './image-upload';
import {
  StrokeAppearancePanel,
  StrokeAppearanceTab,
} from './stroke-appearance';
import { StrokeSizePanel, StrokeSizeTab } from './stroke-size';
import { StrokeDirectionPanel, StrokeDirectionTab } from './stroke-direction';
import { ImageMaskingPanel, ImageMaskingTab } from './image-masking';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'stretch',
  },
  indicator: {
    left: 0,
    width: '0.2rem',
  },
});

const Sidebar: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | boolean>(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    // If same tab is clicked twice, hide the panels
    setValue((prev) => (newValue === prev ? false : newValue));
  };

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Tabs
        indicatorColor="primary"
        variant="scrollable"
        classes={{ indicator: classes.indicator }}
        orientation="vertical"
        value={value}
        onChange={handleChange}
      >
        <ImageUploadTab />
        <StrokeAppearanceTab />
        <StrokeSizeTab />
        <StrokeDirectionTab />
        <ImageMaskingTab />
      </Tabs>
      <Box>
        <ImageUploadPanel index={0} value={value} />
        <StrokeAppearancePanel index={1} value={value} />
        <StrokeSizePanel index={2} value={value} />
        <StrokeDirectionPanel index={3} value={value} />
        <ImageMaskingPanel index={4} value={value} />
      </Box>
    </Box>
  );
};

export default Sidebar;
