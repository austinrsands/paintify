import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
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
  spacer: {
    marginTop: '4rem',
  },
  message: {
    marginTop: '1.5rem',
    alignSelf: 'center',
  },
}));

const ReferenceImagePanel: React.FC<TabPanelProps> = (props) => {
  const classes = useStyles();
  const { state } = useAppContext();
  return (
    <TabPanel {...props}>
      <TabPanelTitle>Reference Image</TabPanelTitle>
      <TabPanelContent>
        {state.imageData ? (
          <ReferenceImagePreview />
        ) : (
          <Box className={classes.spacer} />
        )}
        <ReferenceImageUploadButton />
        {!state.imageData && (
          <ReferenceImageUploadMessage className={classes.message} />
        )}
      </TabPanelContent>
    </TabPanel>
  );
};

export default ReferenceImagePanel;
