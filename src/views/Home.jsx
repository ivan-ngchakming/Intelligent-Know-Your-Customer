import React from 'react';
import { Button } from '@mui/material';

const buttonStyle = {
  marginLeft: '10px',
};

export default function Home() {

  const handleClick = () => {
    console.log("Clicked Foo 1");
    const student = {name: 'Lucas', school: 'HKU'}
    window.server.foo.foo('test', 69, JSON.stringify(student)).then(res => {
      console.log(res);
    })
  }

  const handleClick2 = () => {
    console.log("Clicked Foo 2");
    window.server.transactions.example_api();
  }

  return (
    <div>
      <Button href="/" variant="contained" sx={buttonStyle}>
        Logout
      </Button>

      <Button onClick={handleClick} variant="contained" sx={buttonStyle}>
        Foo
      </Button>

      <Button onClick={handleClick2} variant="contained" sx={buttonStyle}>
        Foo 2
      </Button>
    </div>
  )
}
