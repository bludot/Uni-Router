import React from 'react';
import { RouteHistory as history } from 'univ-router';

const Hello = () => (
  <div>
    <h1>
Hello
      {name}
!
    </h1>
    <button
      onClick={() => {
        history.push('/hello2/variable', null);
      }}
    >
          Click here
    </button>
  </div>
);

export default Hello;
