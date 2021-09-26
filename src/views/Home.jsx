import React from 'react';
import { Button } from '@mui/material';

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
      <Button href="/">
        Logout
      </Button>

      <Button onClick={handleClick}>
        Foo
      </Button>

      <Button onClick={handleClick2}>
        Foo 2
      </Button>
    </div>
  )
}
