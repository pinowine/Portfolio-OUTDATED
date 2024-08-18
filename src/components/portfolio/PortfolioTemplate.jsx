import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const PortfolioTemplate = ({ portfolio }) => {

  const { t } = useTranslation();

  return (
    <Link key={portfolio.id} className="portfolio__card" to={`/portfolio/${portfolio.id}/#intro`}>
      <img src={portfolio.imgSrc} alt={`Image of ${portfolio.title}`} />
      <div className="portfolio__card-title">
        <h3>{t(portfolio.title)}</h3>
        <p>{t(portfolio.description)}</p>
      </div>
    </Link>
  );
};

PortfolioTemplate.propTypes = {
  portfolio: PropTypes.shape({
    id: PropTypes.number,
    imgSrc: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};

PortfolioTemplate.defaultProps = {
  portfolio: {
    id: 1, 
    imgSrc: 'defaultImage.jpg',
    type: 'defaultType',
    title: 'Default Title',
    description: 'Default Description'
  }
};

export default PortfolioTemplate;