import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useAuth } from '../hooks/auth.hook';

interface PropsType {
  closeUserModal: () => void;
  defaultUserModalState: () => void;
}

export const LoggedUser: React.FC<PropsType> = ({
  closeUserModal,
  defaultUserModalState,
}) => {
  const { userId, logout } = useAuth();

  const logoutBtnHandler = () => {
    logout();
    defaultUserModalState();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #b5b5b5',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Button onClick={closeUserModal}>Close</Button>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2 }}
      >
        You are logged as:
      </Typography>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ mb: 2 }}
      >
        {userId}
      </Typography>
      <Button onClick={logoutBtnHandler}>Log out</Button>
    </Box>
  );
};
