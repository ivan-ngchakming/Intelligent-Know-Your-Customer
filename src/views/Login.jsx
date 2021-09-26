import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Avatar, Button, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Webcam from "react-webcam";

export default function Login() {
  const history = useHistory();
  const [init, setInit] = useState(false);
  const [webcamHeight, setWebcamHeight] = useState(0);
  const [faceLocations, setFaceLocations] = useState([]);
  const webcamRef = React.useRef();

  const streamVideo = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const imageBase64 = imageSrc.split(',')[1]
      window.server.auth.login(imageBase64).then(res => {
        const data = JSON.parse(res)
        console.log(data)
        if (data.result)
          setFaceLocations(data.result.map(face => face.location));
      })
      setWebcamHeight(webcamRef.current.video.offsetHeight)
    }
    
    // history.push('/home');
    setTimeout(handleClick, 100)
  }

  const handleClick = () => {
    streamVideo()
  }

  const drawReac = (top_x, top_y, width, height) => {
    const _width = width;
    const _height = height;
    const _left = top_x;
    const _top = top_y;

    return (
      <div
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

  const handleImageResize = (rect) => {
    console.log("Image resized", rect, webcamRef)
    if (webcamRef.current) {
      setWebcamHeight(webcamRef.current.video.offsetHeight);
    }
  }

  useEffect(() => {
    streamVideo();
  }, [])

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
              <div
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  position: 'relative',
                  height: webcamHeight,
                }}
              >
                <Webcam 
                  style={{
                    width: '100%',
                    position: "absolute",
                    borderRadius: "1%",
                  }}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
                {faceLocations.map((data) => (
                  drawReac(...data)
                ))}
              </div>
            </Box>
            
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </>
  )
}
