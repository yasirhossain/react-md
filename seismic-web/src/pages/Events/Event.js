import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { db, auth, analytics } from '../../modules/firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Chat from '../../components/Chat';
import { VideoPlayer } from '../../components/VideoPlayer';
import Trivia from '../../components/Poll/Trivia';

import { MOVIES } from '../../helpers/constants';

import { slugify } from '../../helpers/helperFunctions';

import '../../styles/Event.scss';

function Event(props) {
  const user = props.user;
  const campaigns = props.campaigns;
  const setUser = props.setUser;

  const { eventId } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  // const selectedColor = queryParams.get("color");

  const [currentUser, setCurrentUser] = useState(null);
  const [currentCampaign, setCurrentCampaign] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
    setCurrentCampaign(
      campaigns && campaigns.find((c) => slugify(c.title) === eventId)
    );
  }, [user, campaigns]);

  return (
    <div className="event">
      <section
        className="main"
        style={{
          backgroundImage: currentCampaign
            ? `url(${currentCampaign.banner})`
            : 'none',
        }}
      >
        <Trivia />
        {/*
          <img
            className="qr-code"
            src="https://firebasestorage.googleapis.com/v0/b/showintel-8dcf8.appspot.com/o/qr-test.png?alt=media&token=d4416410-3f02-4652-b3e4-8eaa65b7d00e"
            alt="Flow Code QR"
          />
          <VideoPlayer video={MOVIES[0]} />
        */}
        <div
          className="text-block"
          style={{
            backgroundImage:
              currentCampaign && currentCampaign.styles
                ? `linear-gradient(to bottom, rgba(245, 246, 252, 0.0), rgba(117, 19, 93, 0.73))`
                : 'none',
          }}
        >
          <h1>{currentCampaign && currentCampaign.artist}</h1>
          <h2>{currentCampaign && currentCampaign.title}</h2>
          <p>{currentCampaign && currentCampaign.description}</p>
        </div>
      </section>
      <section className="rail">
        <Chat user={currentUser} setUser={setUser} authenticated={auth} />
      </section>
    </div>
  );
}

export default Event;
