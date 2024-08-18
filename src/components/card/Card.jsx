import React from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import './card.css';

import { useTranslation } from 'react-i18next';

const Card = ({ icon, title, features }) => {

	const { t } = useTranslation();

	return (
		<div className='card'>
			<div className='card__inner'>
				<div className='card__icon'>{React.createElement(icon)}</div>
				<div className='card__title'>{t(title)}</div>
				<div className='card__features'>
					{features?.map((feature) => (
						<p key={uuid()}>{t(feature)}</p>
					))}
				</div>
			</div>
		</div>
	);
};

Card.propTypes = {
	icon: PropTypes.func,
	title: PropTypes.string.isRequired,
	features: PropTypes.arrayOf(PropTypes.string),
};

export default Card;
