import React from 'react';

const EmojiMessage = props => (
   <div
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
   >
        {props.label}&nbsp;
      {String.fromCodePoint(props.symbol)}
   </div>
);

export default EmojiMessage;