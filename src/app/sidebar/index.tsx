import React, { useState } from 'react';
import { Box, makeStyles, Paper, PaperProps, Tabs } from '@material-ui/core';
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
    display: 'flex',
    justifyContent: 'stretch',
  },
  indicator: {
    width: '0.2rem',
  },
  tabContainer: {
    backgroundColor: '#303030',
  },
  panelContainer: {},
});

const Sidebar: React.FC<PaperProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | boolean>(0);

  // If same tab is clicked twice, hide the panels
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) =>
    setValue((prev) => (newValue === prev ? false : newValue));

  return (
    <Paper
      className={clsx(classes.root, className)}
      square
      elevation={2}
      {...rest}
    >
      <Paper className={classes.tabContainer} square elevation={3}>
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
      </Paper>
      <Box className={classes.panelContainer}>
        <ImageUploadPanel index={0} value={value} />
        <StrokeAppearancePanel index={1} value={value} />
        <StrokeSizePanel index={2} value={value} />
        <StrokeDirectionPanel index={3} value={value} />
        <ImageMaskingPanel index={4} value={value} />
      </Box>
    </Paper>
  );
};

export default Sidebar;
