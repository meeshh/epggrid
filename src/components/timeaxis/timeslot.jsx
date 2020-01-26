import React from 'react';
import { TIMESLOTWIDTH } from '../../settings/defaults';

const TimeSlot = props => {
	return (
		<div className='timeSlotContainer' style={{ width: TIMESLOTWIDTH }}>
			<div className='timeSlot'>
				<span className='label'>{props.label}</span>
			</div>
		</div>
	);
};

export default TimeSlot;
