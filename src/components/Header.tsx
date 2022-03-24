import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React, { useState } from 'react';
import { UserMenu } from './UserMenu';
import { notification } from './Notification';

export const Header: React.FC = () => {
  const [userModalState, setUserModalState] = useState(false);

  const openUserModal = () => {
    setUserModalState(() => true);
  };

  const closeUserModal = (_: any, reason: string) => {
    if (reason !== 'backdropClick') {
      setUserModalState(() => false);
    }
  };

  const closeUserModalBtnHandler = () => {
    setUserModalState(() => false);
    notification('success', 'CLOSE');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Header
        </Typography>
        <IconButton color="inherit" onClick={openUserModal}>
          <AccountCircle />
        </IconButton>
        <UserMenu
          open={userModalState}
          handleClose={closeUserModal}
          closeUserModalBtnHandler={closeUserModalBtnHandler}
        />
      </Toolbar>
    </AppBar>
  );
};
