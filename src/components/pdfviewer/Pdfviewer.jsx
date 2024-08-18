import { Document, Page, pdfjs } from 'react-pdf';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Pdfviewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Pdfviewer = ({filePath, isPdfDoublePage, pdfDescription }) => {
  const { t } = useTranslation();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isDoublePage, setIsDoublePage] = useState(false);
  const [fitToWidth, setFitToWidth] = useState(false);
  const viewerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    if (isDoublePage) {
      if (pageNumber === 1) {
        setPageNumber(2);
      } else {
        setPageNumber((prevPageNumber) => Math.min(Math.max(prevPageNumber + offset * 2, 2), numPages));
      }
    } else {
      setPageNumber((prevPageNumber) => Math.min(Math.max(prevPageNumber + offset, 1), numPages));
    }
  };

  const changeZoom = (offset) => {
    const maxZoom = isDoublePage ? 2.0 : 3.0;
    setScale((prevScale) => Math.min(Math.max(prevScale + offset, 0.5), maxZoom));
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'document.pdf';
    link.click();
  };

  const togglePageMode = () => {
    setIsDoublePage(!isDoublePage);
    setScale(1.0); // Reset zoom when mode changes
  };

  const toggleFitToWidth = () => {
    setFitToWidth(!fitToWidth);
  };

  const renderPages = () => {
    const pageClass = fitToWidth ? 'fit-width' : isDoublePage ? 'double' : 'single';
    if (isDoublePage) {
      if (pageNumber === 1) {
        return (
          <div className={`pages ${pageClass}`}>
            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} className={"left-page"} />
          </div>
        );
      } else {
        return (
          <div className={`pages ${pageClass}`}>
            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} className={"left-page"} />
            {pageNumber + 1 <= numPages && <Page pageNumber={pageNumber + 1} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} className={"right-page"} />}
          </div>
        );
      }
    } else {
      return (
        <div className={isDoublePage ? 'pages double' : 'pages single'}>
          <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} className={"left-page"} />
        </div>
      );
    }
  };

  useEffect(() => {
    if (fitToWidth) {
      const viewerWidth = viewerRef.current.clientWidth;
      setScale(viewerWidth / 600); // Adjust the 600 value if needed for your typical page width
    } else {
      setScale(1.0);
    }
  }, [fitToWidth]);

  return (
    <div className="pdf-viewer">
      <h2> {t("Pdf File Viewer")} </h2>
      <p className="description"> { t(pdfDescription) } </p>
      <div className="pdf-content-wrapper">
        <div className="controls">
          <button onClick={() => changePage(-1)} disabled={pageNumber <= 1} className='button'>{t("Previous Page")}</button>
          <input 
            type="number" 
            value={pageNumber} 
            onChange={(e) => setPageNumber(Number(e.target.value))}
            min="1"
            max={numPages}
          />
          <button onClick={() => changePage(1)} disabled={pageNumber >= numPages - (isDoublePage ? 1 : 0)} className='button'>{t("Next Page")}</button>
          <button onClick={() => changeZoom(-0.1)} disabled={scale <= 0.2} className='button'>-</button>
          <button onClick={() => changeZoom(0.1)} disabled={scale >= (isDoublePage ? 1.0 : 3.0)} className='button'>+</button>
          <button onClick={toggleFitToWidth} className='button'>{fitToWidth ? t('Original Size') : t('Fit to Width')}</button>
          <button onClick={downloadPDF} className='button'>{t("Download PDF")}</button>
          <button onClick={togglePageMode} className='button' disabled={isPdfDoublePage} >{isDoublePage ? t('Single Page Mode') : t('Double Page Mode')}</button>
        </div>
        <div className="document-container" ref={viewerRef}>
          <Document
            file={filePath}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {renderPages()}
          </Document>
        </div>
      </div>
    </div>
  );
  }

Pdfviewer.propTypes = {
  filePath: PropTypes.string.isRequired, // Define prop type for filePath
  isPdfDoublePage: PropTypes.bool, // Define prop type for isPdfDoublePage
  pdfDescription: PropTypes.string
};

export default Pdfviewer;