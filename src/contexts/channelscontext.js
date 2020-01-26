import React, { useReducer } from 'react';
import ChannelsDataset from '../assets/data/channels';
import shows1 from '../assets/data/1';
import shows2 from '../assets/data/2';
import shows3 from '../assets/data/3';
import shows4 from '../assets/data/4';
import shows5 from '../assets/data/5';
import shows6 from '../assets/data/6';
import { filter } from 'lodash';
import moment from 'moment';
import { DEFAULTCHANNELSNUMBER, DEFAULSTARTDATE, DEFAULDISPLAYDATE } from '../settings/defaults';

const showsPages = {
	shows1: shows1,
	shows2: shows2,
	shows3: shows3,
	shows4: shows4,
	shows5: shows5,
	shows6: shows6
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADSHOWS':
			if (action.payload.page > 6) return; //preventive statement for our specific case of 6 datasets

			let dateToDisplay = DEFAULDISPLAYDATE.clone().add(action.payload.page - 1, 'days').format('LL').valueOf();

			let offsetTimeEnd = DEFAULSTARTDATE.add(
				action.payload.offset - (action.payload.page - 1) * 24,
				'hours'
			).add(action.payload.page - 1, 'days');


			let channelsTemp = [];
			[...Array(DEFAULTCHANNELSNUMBER)].map((item, key) => {
				let channel = ChannelsDataset.result.channels[key];

				//get the shows that are only less than a certain initial time
				let shows = filter(
					showsPages[`shows${action.payload.page}`].result,
					show => {
						return (
							show.channelID === channel.groupID &&
							moment(show.stop).isBefore(offsetTimeEnd)
						);
					}
				);

				channel.shows = shows; //filling the shows inside their respective channel
				return (channelsTemp = [...channelsTemp, channel]);
			});

			return {
				...state,
				channels: channelsTemp,
				offset: state.offset + action.payload.offset,
				page: action.payload.page,
				dateToDisplay: dateToDisplay
			};

		default:
			break;
	}
};

let initialState = {
	channels: [],
	offset: 0,
	page: 1,
	dateToDisplay: DEFAULSTARTDATE.format('ll').valueOf()
};

const ChannelsContext = React.createContext(initialState);

const ChannelsProvider = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<ChannelsContext.Provider value={{ state, dispatch }}>
			{props.children}
		</ChannelsContext.Provider>
	);
};

export { ChannelsContext, ChannelsProvider };
