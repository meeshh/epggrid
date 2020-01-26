import React from 'react';
import './channelrow.scss';

const ChannelRow = (props) => {
 return (
  <div className="channelRow">
   {props.children}
  </div>
 );
};

export default ChannelRow;