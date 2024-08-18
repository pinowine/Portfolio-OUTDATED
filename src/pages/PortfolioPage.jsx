import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import './portfolioPage.css'
import BackToTopButton from '../components/backtotop/BackToTop.jsx';
import Footer from '../components/footer/Footer.jsx'

import { useNavigate, useLocation } from 'react-router-dom';

import { Suspense, lazy } from 'react';

const LazyGallery = lazy(() => import('../components/gallery/gallery.jsx'));
const PdfViewer = lazy(() => import('../components/pdfviewer/Pdfviewer.jsx'));
const VideoPlayer = lazy(() => import('../components/VideoPlayer/VideoPlayer.jsx'));
const AudioPlayer = lazy(() => import('../components/AudioPlayer/AudioPlayer.jsx'));

const PortfolioPage = ({ portfolio }) => {

    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const match = location.pathname.match(/\/portfolio\/(\d+)/);
    const currentId = match ? Number(match[1]) : 1;

    const totalPortfolios = 24;

    const handlePrevious = () => {
        const previousId = currentId - 1 < 1 ? totalPortfolios : currentId - 1;
        navigate(`/portfolio/${previousId}/#intro`);
    };

    const handleNext = () => {
        const nextId = currentId + 1 > totalPortfolios ? 1 : currentId + 1;
        navigate(`/portfolio/${nextId}/#intro`);
    };
    
    const contentGenerater = () => {
        return (
            <div>
                {portfolio.contentType.includes('flow') && <LazyGallery items={portfolio.gallery} />}
                {portfolio.contentType.includes('pdf') && <PdfViewer filePath={portfolio.pdfUrl} isPdfDoublePage={portfolio.isPdfDoublePage} pdfDescription={portfolio.pdfDescription} />}
                {portfolio.contentType.includes('video') && <VideoPlayer videoPath={portfolio.videoUrl} videoDescription={portfolio.videoDescription} /> }
                {portfolio.contentType.includes('audio') && <AudioPlayer audioPath={portfolio.audioUrl} audioDescription={portfolio.audioDescription} /> }
            </div>
        );
    };

    if (!portfolio) {
        return <div>Error: Project not found.</div>;
    }

    return (
        <div className='portfolio-page__container'>
            <section className="intro" id='intro'>
                <div className="left">
                    <div className="page-switcher">
                        <button onClick={handlePrevious}>{t('Previous')}</button>
                        <button onClick={handleNext}>{t('Next')}</button>
                    </div>
                    <div className="head-container">
                        <p className="portfolio-page__date">{portfolio.date}</p>
                        <a className={`relative-link ${ portfolio.url === '/' ? 'disabled-link' : ''}`} href={portfolio.url} >
                            <h1 className='portfolio-page__title'>{t(portfolio.title)}</h1>
                        </a>
                        <div className='portfolio-page__tags'>{portfolio.tags.map(tag => <span key={tag}>{`#${t(tag)}`} </span>)}</div>
                    </div>
                    <p className="portfolio-page__txt">{t(portfolio.txt)}</p>
                </div>
                <div className='right'>
                    <div className="portfolio-page__img-cover"></div>
                    <img className='portfolio-page__img' src={portfolio.imgSrc} alt={portfolio.title} />
                </div>
            </section>

            <section className="gallery" id='gallery'>
                <Suspense fallback={<div>Loading...</div>}>
                    {contentGenerater()}
                </Suspense>
            </section>
            <section>
                <BackToTopButton />
            </section>
            <Footer />
        </div>
        
    )
}

PortfolioPage.propTypes = {
    portfolio: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        date: PropTypes.string,
        txt: PropTypes.string.isRequired,
        contentType: PropTypes.arrayOf(PropTypes.string).isRequired,
        gallery: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            imageUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })),
        pdfUrl: PropTypes.string,
        isPdfDoublePage: PropTypes.bool,
        pdfDescription: PropTypes.string,
        videoUrl: PropTypes.string,
        videoDescription: PropTypes.string,
        audioUrl: PropTypes.string,
        audioDescription: PropTypes.string
    }).isRequired,
};

export default PortfolioPage;