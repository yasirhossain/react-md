import React, { useRef, useState, useEffect } from 'react';

import '../styles/AvatarPicker.scss';

import { db, analytics } from '../modules/firebase';
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Filter from 'bad-words';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { AVATARS } from '../helpers/constants';
import { nameGenerator } from '../helpers/nameGenerator';
import { MAX_CHAT_CAR_COUNT } from '../helpers/constants';

function AvatarPicker(props) {
  const { open, setOpen, user } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [chatName, setChatName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setAvatar(user && user.avatarUrl);
    setChatName(user && user.chatName);
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const cancel = () => {
    setAvatar(user.avatarUrl);
    setChatName(user.chatName);
    handleClose();
  };

  const updateIdentity = () => {
    if (!validateChatName()) {
      setShowErrors(true);
    } else {
      // TODO: update chatname / avatar to user identity
      // setSelf(user);
      handleClose();
    }
  };

  const selectAvatar = (e) => {
    setAvatar(e.target.src);
  };

  const handleInputChange = (e) => {
    setChatName(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode == 13) {
      updateIdentity();
    }
  };

  const newChatName = () => {
    setChatName(nameGenerator());
  };

  const validateChatName = () => {
    const nameLength = chatName.length;
    const trimedValueLength = chatName.trim().length;
    const badWordFilter = new Filter();

    let isValid = true;

    if (nameLength == 0) {
      setErrors('Please enter a chat name');
      isValid = false;
    } else if (trimedValueLength < 2) {
      setErrors('Enter a longer chat name');
      isValid = false;
    } else if (nameLength > MAX_CHAT_CAR_COUNT) {
      setErrors('Enter a shorter chat name');
      isValid = false;
    } else if (badWordFilter.isProfane(chatName)) {
      setErrors('Keep it PG!');
      isValid = false;
    }

    if (!isValid) {
      setTimeout(() => {
        setErrors('');
      }, 2000);
    }

    return isValid;
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="avatar-picker"
    >
      <DialogTitle id="responsive-dialog-title">
        {'Personalize Yourself'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update your identity with pre-defined avatars, or sign up to
          personalize your identity even further.
        </DialogContentText>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              error={errors ? true : false}
              id="outlined-error"
              label="Chat Name"
              value={chatName}
              placeholder={chatName}
              autoComplete="off"
              variant="standard"
              onChange={handleInputChange}
              onKeyDown={handleEnter}
            />
            <AutorenewIcon
              onClick={newChatName}
              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            />
          </Box>
          {errors && errors.length > 0
            ? [
                <label className="errors" key="field-errors">
                  {errors}
                </label>,
              ]
            : null}
        </Stack>
        <div className="avatar-container">
          {AVATARS.map((avatarUrl, i) => (
            <Avatar
              sx={{ width: 65, height: 65 }}
              src={avatarUrl}
              onClick={selectAvatar}
              className={avatar === avatarUrl ? 'current' : ''}
              key={i}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={cancel}>
          Cancel
        </Button>
        <Button onClick={updateIdentity} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AvatarPicker;
