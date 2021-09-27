import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { Avatar, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Webcam from "react-webcam";
import ResizeObserver from 'react-resize-observer';

const CONFIDENCE = 60

export default function Login() {
  const history = useHistory();
  const [init, setInit] = useState(false);
  const [webcamHeight, setWebcamHeight] = useState(0);
  const [faceLocations, setFaceLocations] = useState([]);
  const [msg, setMsg] = useState('Detecting Face...');
  const [loggedIn, setLoggedIn] = useState(false)
  const webcamRef = React.useRef();

  const streamVideo = useCallback(() => {
    var timer;
    let imageSrc;

    try {
      imageSrc = webcamRef.current.getScreenshot();
    } catch (e) {
      console.error(e)
    }
      
    if (imageSrc) {
      const imageBase64 = imageSrc.split(',')[1]
      window.server.auth.login(imageBase64).then(res => {
        const data = JSON.parse(res)
        console.log(data)
        if (data.result) {
          setFaceLocations(data.result.map(face => face.location));
          data.result.forEach(face => {
            console.log(face)
            if (face.confidence > CONFIDENCE) {
              setMsg("Login Success!");
              setLoggedIn(true)
              clearTimeout(timer);
              setTimeout(() => {
                history.push('/home');
              }, 1000)
            }
          });
        } 
      })
    }
    timer = setTimeout(streamVideo, 100);
  }, [history])

  const drawReac = (top_x, top_y, width, height, index) => {
    const _width = width;
    const _height = height;
    const _left = top_x;
    const _top = top_y;

    return (
      <div
        key={index}
        style={{
          border: `1px solid red`,
          position: 'absolute',
          zIndex: 99,
          width: _width,
          height: _height,
          top: _top,
          left: _left,
        }}
      />
    )
  }

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
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                  drawReac(...data, index)
                ))}
                </Box>
              </Box>
            </Box>

            <Typography variant="h5" sx={{textAlign: 'center', marginTop: 8}}>
              {msg}
            </Typography>
            {loggedIn && (
              <Typography variant="body1" sx={{textAlign: 'center', marginTop: 1}}>
                Taking you to Home page...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}
