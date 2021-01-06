import React from 'react';
import { IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import StyleProps from '../../../../../lib/structures/style-props';

const GithubButton: React.FC<StyleProps> = (props) => (
  <IconButton
    size="medium"
    href="https://github.com/austinrsands/paintify"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub repo link"
    {...props}
  >
    <GitHubIcon />
  </IconButton>
);

export default GithubButton;
