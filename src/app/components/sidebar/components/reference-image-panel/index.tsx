import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../generic/components/tab-panel';
import ReferenceImageUploadButton from './components/upload-button';
import ReferenceImagePreview from './components/preview';
import { useAppContext } from '../../../../context';
import ReferenceImageUploadMessage from './components/upload-message';
import TabPanelTitle from '../../../../../generic/components/tab-panel-title';
import TabPanelContent from '../../../../../generic/components/tab-panel-content';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  preview: {
    margin: '1rem 0',
    alignSelf: 'center',
  },
  message: {
    margin: '4rem 0 6rem 0',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {},
});

const ReferenceImagePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Reference Image</TabPanelTitle>
      <TabPanelContent className={classes.content}>
        {state.imageData ? (
          <ReferenceImagePreview className={classes.preview} />
        ) : (
          <ReferenceImageUploadMessage className={classes.message} />
        )}
        <ReferenceImageUploadButton className={classes.button} />
      </TabPanelContent>
    </TabPanel>
  );
};

export default ReferenceImagePanel;
