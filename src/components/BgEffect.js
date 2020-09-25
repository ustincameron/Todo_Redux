import React from 'react';

const BgEffect = props => (
   <ul className="bg-circles">
      {
         Array.from({ length: props.length }, (x,i) => (<li key={i}></li>))
      }
   </ul>
);

export default BgEffect;
