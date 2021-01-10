import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Canvas, { CanvasProps } from '../../canvas';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    margin: '0.5rem 0 2rem 0',
    alignSelf: 'center',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  },
}));

export type TabPanelPreviewProps = CanvasProps;

const TabPanelPreview: React.FC<TabPanelPreviewProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  return <Canvas className={clsx(classes.root, className)} {...rest} />;
};
export default TabPanelPreview;
