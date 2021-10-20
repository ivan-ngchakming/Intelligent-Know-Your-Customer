import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Avatar, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Webcam from "react-webcam";
import ResizeObserver from 'react-resize-observer';
import { drawRect } from './utils';

const CONFIDENCE = 60

export default function FaceId({ user }) {
  const history = useHistory();
  const [init, setInit] = useState(false);
  const [webcamHeight, setWebcamHeight] = useState(0);
  const [faceLocations, setFaceLocations] = useState([]);
  const [timer, setTimer] = useState(null);
  const [msg, setMsg] = useState('Detecting Face...');
  const [loggedIn, setLoggedIn] = useState(false)
  const webcamRef = React.useRef();

  const login = useCallback((user_id, confidence, username) => {
    clearTimeout(timer);

    setMsg("Login Success!");
    localStorage.setItem('userId', user_id);
    localStorage.setItem('username', username);

    // Log login record to login history table
    window.server.auth.log_login(JSON.stringify({
      user_id: user_id,
      confidence: confidence
    }));

    console.log("Successfully logged-in")

    setTimeout(() => {
      history.push('/home');
    }, 1000)
  }, [history, timer])

  const streamVideo = useCallback(() => {
    let imageSrc;

    try {
      imageSrc = webcamRef.current.getScreenshot();
    } catch (e) {
      console.error(e);
      return;
    }

    if (imageSrc) {
      const imageBase64 = imageSrc.split(',')[1]
      window.server.auth.login(imageBase64, user.user_id).then(res => {
        const data = JSON.parse(res)
        if (data.result) {
          setFaceLocations(data.result.map(face => face.location));
          data.result.forEach(face => {
            if (face.confidence > CONFIDENCE && !loggedIn) {
              setLoggedIn(true)
              clearTimeout(timer);
              login(user.user_id, face.confidence, user.name);
              return;
            }
          });
        }
      })
    }
    setTimer(setTimeout(streamVideo, 100));
  }, [login, user, timer, loggedIn])

  const onResize = (rect) => {
    if (webcamRef.current) {
      setWebcamHeight(webcamRef.current.video.offsetHeight);
    };
  }

  useEffect(() => {
    if (!init) {
      streamVideo();
      setInit(true)
    }
  }, [init, streamVideo])

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} onClick={() => {login(user.user_id, 60, user.name)}}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box sx={{ mt: 1 }}>
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            width: '50vw',
            height: webcamHeight,
          }}
        >
          <Box
            style={{
              flex: 1,
              justifyContent: 'center',
              position: 'relative',
              height: webcamHeight,

            }}
          >
            <Box sx={{
              position: "absolute",
              width: '100%',
            }}>
              <ResizeObserver
                onReflow={onResize}
              />
              <Webcam
                style={{
                  width: '100%',
                  borderRadius: "1%",
                  border: loggedIn ? `10px solid #f07260` : null,
                }}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            {faceLocations.map((data, index) => (
              drawRect(...data, index)
            ))}
            </Box>
          </Box>
        </Box>

        <Typography variant="h5" sx={{textAlign: 'center', marginTop: 2}}>
          {msg}
        </Typography>
        <Typography variant="body1" sx={{textAlign: 'center', marginTop: 1}}>
          {loggedIn ? "Taking you to Home page..." : `Hello ${user.name.replace(/^\w/, (c) => c.toUpperCase())}, please confirm your face identity`}
        </Typography>
      </Box>
    </>
  )
}
