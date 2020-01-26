import React, { useContext } from 'react';
import './topbar.scss';
import { ChannelsContext } from '../../contexts/channelscontext';

const TopBar = () => {
	const { state } = useContext(ChannelsContext);
	return (
		<div className='topbarContainer'>
			<span style={{ color: 'red', fontWeight: 'bold' }}>
				{state.dateToDisplay}
			</span>
		</div>
	);
};

export default TopBar;
