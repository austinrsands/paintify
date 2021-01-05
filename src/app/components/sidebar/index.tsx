import React, { useState } from 'react';
import { Box, BoxProps, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import clsx from 'clsx';
import ImageRounded from '@material-ui/icons/ImageRounded';
import BrushRounded from '@material-ui/icons/BrushRounded';
import CompareRounded from '@material-ui/icons/CompareRounded';
import WavesRounded from '@material-ui/icons/WavesRounded';
import GridOnRounded from '@material-ui/icons/GridOnRounded';
import ImageMaskingPanel from './components/image-masking-panel';
import ReferenceImagePanel from './components/reference-image-panel';
import StrokeStylePanel from './components/stroke-style-panel';
import StrokeDirectionPanel from './components/stroke-direction-panel';
import StrokeSizePanel from './components/stroke-size-panel';

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
    display: 'flex',
    alignItems: 'stretch',
  },
  tab: {
    minWidth: '0',
    padding: '1.3rem',
  },
  panelContainer: {
    flex: 1,
  },
  panel: {
    height: '100%',
  },
});

const Sidebar: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState<number | boolean>(0);

  // If same tab is clicked twice, hide the panels
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) =>
    setValue((prev) => (newValue === prev ? false : newValue));

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Paper className={classes.tabContainer} square elevation={3}>
        <Tabs
          variant="scrollable"
          indicatorColor="primary"
          classes={{ indicator: classes.indicator }}
          orientation="vertical"
          value={value}
          onChange={handleChange}
        >
          <Tab className={classes.tab} icon={<ImageRounded />} disableRipple />
          <Tab className={classes.tab} icon={<BrushRounded />} disableRipple />
          <Tab className={classes.tab} icon={<WavesRounded />} disableRipple />
          <Tab className={classes.tab} icon={<GridOnRounded />} disableRipple />
          <Tab
            className={classes.tab}
            icon={<CompareRounded />}
            disableRipple
          />
        </Tabs>
      </Paper>
      <Box className={classes.panelContainer}>
        <ReferenceImagePanel
          className={classes.panel}
          index={0}
          value={value}
        />
        <StrokeStylePanel className={classes.panel} index={1} value={value} />
        <StrokeSizePanel className={classes.panel} index={2} value={value} />
        <StrokeDirectionPanel
          className={classes.panel}
          index={3}
          value={value}
        />
        <ImageMaskingPanel className={classes.panel} index={4} value={value} />
      </Box>
    </Box>
  );
};

export default Sidebar;
