import React, { useContext } from 'react';
import './timeaxis.scss';
import TimeSlot from './timeslot';
import { ChannelsContext } from '../../contexts/channelscontext';

const TimeAxis = () => {
	const { state } = useContext(ChannelsContext);

	const renderTimeSlots = () => {
		return [...Array(state.offset - (state.page - 1) * 24)].map((item, key) => {
			let hourValue = key % 24;
			return (
				<TimeSlot
					key={key}
					label={`${hourValue > 9 ? hourValue : `0${hourValue}`}:00`}
				/>
			);
		});
	};
	return <div className='timeAxisContainer'>{renderTimeSlots()}</div>;
};

export default TimeAxis;
