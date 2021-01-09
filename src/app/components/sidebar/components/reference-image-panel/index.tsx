import React from 'react';
import { makeStyles } from '@material-ui/core';
import TabPanel, {
  TabPanelProps,
} from '../../../../../lib/components/tab-panel';
import ReferenceImageUploadButton from './components/upload-button';
import ReferenceImagePreview from './components/preview';
import { useAppContext } from '../../../../context';
import ReferenceImageUploadMessage from './components/upload-message';
import TabPanelTitle from '../../../../../lib/components/tab-panel/title';
import TabPanelContent from '../../../../../lib/components/tab-panel/content';

const useStyles = makeStyles((theme) => ({
  content: {},
  message: {
    margin: '4rem 0 5rem 0',
    alignSelf: 'center',
    textAlign: 'center',
  },
  button: {
    minWidth: '8rem',
  },
}));

const ReferenceImagePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Reference Image</TabPanelTitle>
      <TabPanelContent className={classes.content}>
        {state.imageData ? (
          <ReferenceImagePreview />
        ) : (
          <ReferenceImageUploadMessage className={classes.message} />
        )}
        <ReferenceImageUploadButton className={classes.button} />
      </TabPanelContent>
    </TabPanel>
  );
};

export default ReferenceImagePanel;
