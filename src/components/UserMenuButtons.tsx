import React from 'react';
import { Typography, Button, Box } from '@mui/material';

interface PropsType {
  signIn: () => void;
  signUp: () => void;
  closeUserModal: () => void;
}

export const UserMenuButtons: React.FC<PropsType> = ({
  signIn,
  signUp,
  closeUserModal,
}) => {
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
        You are not signed in
      </Typography>
      <Button onClick={signIn}>Sign In</Button>
      <Button onClick={signUp}>Sign Up</Button>
    </Box>
  );
};
