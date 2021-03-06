import React from 'react';

import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export function LogOut({ logOut }) {
  return (
    <IconButton color="inherit" aria-label="log out" onClick={logOut}>
      <ExitToAppIcon size="large" />
    </IconButton>
  );
}
