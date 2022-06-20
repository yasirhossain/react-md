import React, { useContext, useState, useEffect } from 'react';

import { UserContext, EventsContext } from '../Context';

import '../styles/Admin.scss';

import { isAdmin } from '../helpers/helperFunctions';

import { auth, analytics, db } from '../modules/firebase';
import firebase from 'firebase/compat/app';

import Chat from '../components/Chat';

// import ChatControls from '../components/Tools/Chat/ChatControls';
import Poll from '../components/Poll/Poll';
import Trivia from '../components/Poll/Trivia';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Admin(props) {
  const campaigns = props.campaigns;

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [isLive, setIsLive] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(true);

  useEffect(() => {}, [campaigns]);

  return (
    <div className="admin">
      {isAdmin(currentUser)
        ? [
            <section key="isadmin">
              <section className="main">
                <Container maxWidth="lg">
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 1, sm: 2, md: 12 }}
                  >
                    <Grid item xs={1} sm={2} md={4} key="poll">
                      <Poll user={currentUser} />
                    </Grid>
                    <Grid item xs={1} sm={2} md={4} key="trivia">
                      <Trivia user={currentUser} key="trivia" />
                    </Grid>
                  </Grid>
                </Container>
              </section>
              {chatEnabled ? (
                [
                  <section className="rail" key="chat-panel">
                    <Chat user={currentUser} authenticated={auth} />
                  </section>,
                ]
              ) : (
                <></>
              )}
            </section>,
          ]
        : [
            <section key="notadmin">
              <h1>Please Login as Admin</h1>
            </section>,
          ]}
    </div>
  );
}

export default Admin;
