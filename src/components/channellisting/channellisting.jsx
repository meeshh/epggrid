import React from 'react';
import './channellisting.scss';
import { Tooltip } from '@material-ui/core';

const ChannelListing = ({ channel }) => {
	const logo = `https://cdn.hd-plus.de/senderlogos/bright-cropped/${channel.groupID}.png`;

	return (
		<Tooltip title={channel.name} placement='right'>
			<div
				className='channelListing'
				data-id={channel.groupID}
			>
				<img style={{ width: '100%' }} alt={channel.name} src={logo} />
			</div>
		</Tooltip>
	);
};

export default ChannelListing;
