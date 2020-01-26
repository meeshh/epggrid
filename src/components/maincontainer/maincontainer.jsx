import React, { useContext, useEffect } from 'react';
import './maincontainer.scss';
import ChannelRow from '../channelrow/channelrow';
import Show from '../show/show';
import TimeAxis from '../timeaxis/timeaxis';
import { ChannelsContext } from '../../contexts/channelscontext';
import moment from 'moment';
import { TIMESLOTWIDTH, DEFAULTTIMESLOTS } from '../../settings/defaults';

const MainContainer = props => {
	const { state, dispatch } = useContext(ChannelsContext);

	useEffect(() => {
		dispatch({
			type: 'LOADSHOWS',
			payload: {
				offset: DEFAULTTIMESLOTS,
				page: 1
			}
		});
	}, [dispatch]);

	//! this is to know if the scroll has reached the end horizontally
	const isEnd = el => {
		return el.offsetWidth + el.scrollLeft === el.scrollWidth;
	};
	const handleScroll = e => {
		if (isEnd(e.target)) {
			//!fetching more data
			dispatch({
				type: 'LOADSHOWS',
				payload: {
					offset: DEFAULTTIMESLOTS, //! we can change this value to fetch new data for an offset of time slots
					page: parseInt((state.offset / 24)) + 1
				}
			});
		}
	};

	//! the following event generates a warning in the console because it is a passive event
	const handleWheel = e => {
		e.preventDefault();
		let container = document.getElementById('mainContainer');
		let containerScrollPosition = document.getElementById('mainContainer')
			.scrollLeft;
		container.scrollTo({
			top: 0,
			left: containerScrollPosition + e.deltaY,
			behaviour: 'smooth' //if you want smooth scrolling
		});
	};

	const renderChannelRow = (channel, key) => {
		return (
			<ChannelRow key={key}>
				{channel.shows.map((show, key) => {
					if (key === 0) {
						//if it is the first show of the day, it might start later than 00:00 because there will be a show from the previous day still running
						let beginning = moment(show.start).set({ h: '00', m: '00' }); //this is just to set the date of the concerned day and default it to time 00:00

						//calculating how many minutes are before the show starts to cover the grid.
						let minutesDiff = moment
							.duration(moment(show.start).diff(beginning))
							.asMinutes();
						return (
							<Show
								key={key}
								data={show}
								style={{ marginLeft: (TIMESLOTWIDTH * minutesDiff) / 60 }}
							/>
						);
					} else {
						return <Show key={key} data={show} />;
					}
				})}
			</ChannelRow>
		);
	};

	return (
		<div
			id='mainContainer'
			className='mainContainer'
			onScroll={handleScroll}
			onWheel={handleWheel}
		>
			<div className='spacer'>
				<TimeAxis />
			</div>

			{state.channels.map((channel, key) => {
				return renderChannelRow(channel, key);
			})}
		</div>
	);
};

export default MainContainer;
