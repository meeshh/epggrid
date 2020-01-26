import React from 'react';
import './show.scss';
import { Tooltip, withStyles } from '@material-ui/core';
import { TIMESLOTWIDTH } from '../../settings/defaults';
import slugify from 'slugify';
import moment from 'moment';

const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: '#2b3749',
		color: 'rgba(255, 255, 255, 0.87)',
		maxWidth: 220,
		border: '1px solid #dadde9'
	}
}))(Tooltip);

const Show = props => {
	const show = props.data;

	let showWeight = (TIMESLOTWIDTH * show.length) / 60;
	let opacity = parseFloat(showWeight / 1000).toFixed(2);

	return (
		<HtmlTooltip
			title={
				<div>
					<h2>
						{show.title} -- <em>{show.length}m</em>
					</h2>
					<h3>
						<em>{show.subtitle}</em>
					</h3>
					<h4>Starts: {moment(show.start).format('YYYY-MM-DD HH:mm')} </h4>
					<h4>Ends: {moment(show.stop).format('YYYY-MM-DD HH:mm')} </h4>
					<h4>
						<div
							className={`genre ${slugify(show.genreID, {
								replacement: '',
								lower: true,
								remove: /[*+~.()'"!:@]/g
							})}`}
						></div>
						{show.genre ? show.genre : show.genreID}
					</h4>
				</div>
			}
			placement='top-start'
		>
			<div
				className={`showContainer ${slugify(show.genreID, {
					replacement: '',
					lower: true,
					remove: /[*+~.()'"!:@]/g
				})}`}
				style={{
					...props.style,
					width: showWeight,
					backgroundColor: `rgba(76,57,196, ${opacity})`,
					color: showWeight < 500 ? '#2b3749' : '#ffffff' //to contras with the background
				}}
			>
				<h3
					style={{
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden'
					}}
				>
					{show.title}
				</h3>
				<h5
					style={{
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						overflow: 'hidden'
					}}
				>
					{show.length} minutes
				</h5>
			</div>
		</HtmlTooltip>
	);
};

export default Show;
