import React, { useContext } from 'react';
import './channelspanel.scss';
import ChannelListing from '../channellisting/channellisting';
import { ChannelsContext } from '../../contexts/channelscontext';

const ChannelsPanel = () => {
	const { state } = useContext(ChannelsContext);

	const renderChannelsListings = () => {
		return state.channels.map((channel, key) => {
			const { name, groupID } = channel;
			return (
				<ChannelListing
					key={key}
					channel={{
						name: name,
						groupID: groupID
					}}
				/>
			);
		});
	};

	return (
		<div className='channelsPanelContainer'>
			<div className='spacer'></div>

			{renderChannelsListings()}
		</div>
	);
};

export default ChannelsPanel;
