import { useState } from 'react';

import PropTypes from 'prop-types';
import './gallery.css';
import Masonry from 'react-masonry-css';

import { useTranslation } from 'react-i18next';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';


const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

const Gallery = ({ items }) => {

  const { t } = useTranslation();

  const [selectedImg, setSelectedImg] = useState(null);

  const closeModal = () => setSelectedImg(null);

  return (
    <>
      <h2> {t("Content Flow")} </h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <div className="gallery-container" key={index} onClick={() => setSelectedImg(item.imageUrl)}>
            <div className="img-cover">
              <img src={item.imageUrl} alt={item.title} className="card-image"/>
            </div>
            <div className="card-body">
              <h2 className="card-title">{t(item.title)}</h2>
              <p className="card-description">{t(item.description)}</p>
            </div>
          </div>
        ))}
      </Masonry>

      {selectedImg && (
        <TransformWrapper
          limitToBounds={false}
          centerOnInit={true}
          smooth={true}
          initialScale={0.3}
          minScale={0.1}
          maxScale={10}
          centerZoomedOut={true}
          disablePadding={true}
          wheel={{ 
            step: 0.2,
            smoothStep: 0.0001
          }}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <div className="lightbox-backdrop" onClick={closeModal} />
              <div className="lightbox-content">
                <div className="lightbox-controls">
                  <button onClick={() => zoomIn(0.5)} className='button'>+</button>
                  <button onClick={() => zoomOut(0.5)} className='button'>-</button>
                  <button onClick={closeModal} className='button'>x</button>
                </div>
                <div className="lightbox-wrapper">
                  <TransformComponent
                    wrapperClass="lightbox-wrapper"
                    wrapperStyle={{ height: '100vh', width: '100vw' }}
                  >
                    <img src={selectedImg} alt="Zoomed" className="lightbox-image" />
                  </TransformComponent>
                </div>
              </div>
            </>
          )}
        </TransformWrapper>
      )}

    </>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
};

export default Gallery;
