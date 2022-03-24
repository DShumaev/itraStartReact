import { Modal } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { UserMenuButtons } from './UserMenuButtons';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { LoggedUser } from './LoggedUser';
import { useAuth } from '../hooks/auth.hook';

interface PropsType {
  open: boolean;
  handleClose: (_: any, reason: string) => void;
  closeUserModalBtnHandler: () => void;
}

enum ModalStatus {
  unlogged = 'unlogged',
  logged = 'logged',
  signin = 'signin',
  signup = 'signup',
}

export const UserMenu: React.FC<PropsType> = ({
  open,
  handleClose,
  closeUserModalBtnHandler,
}) => {
  const [modalState, setModalState] = useState(ModalStatus.unlogged);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
    setModalState(() => ModalStatus.logged);
  }
}, [token]);

  const signInBtnHandler = (): void => {
    setModalState(() => ModalStatus.signin);
  };

  const signUpBtnHandler = (): void => {
    setModalState(() => ModalStatus.signup);
  };

  const defaultUserModalState = (): void => {
    setModalState(() => ModalStatus.unlogged);
  };

  const loggedUserModalState = (): void => {
    setModalState(() => ModalStatus.logged);
  };

  const returnComponent = () => {
    if (token && modalState === ModalStatus.logged) {
      return (
        <LoggedUser
          closeUserModal={closeUserModalBtnHandler}
          defaultUserModalState={defaultUserModalState}
        />
      );
    }

    if (modalState === ModalStatus.signin) {
      return (
        <SignIn
          signUpBtnHandler={signUpBtnHandler}
          closeUserModal={closeUserModalBtnHandler}
          defaultUserModalState={defaultUserModalState}
          loggedUserModalState={loggedUserModalState}
        />
      );
    }

    if (modalState === ModalStatus.signup) {
      return (
        <SignUp
          signInBtnHandler={signInBtnHandler}
          closeUserModal={closeUserModalBtnHandler}
          defaultUserModalState={defaultUserModalState}
        />
      );
    }

    return (
      <UserMenuButtons
        signIn={signInBtnHandler}
        signUp={signUpBtnHandler}
        closeUserModal={closeUserModalBtnHandler}
      />
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {returnComponent()}
    </Modal>
  );
};
