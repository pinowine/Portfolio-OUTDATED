import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './VideoPlayer.css'


const VideoPlayer = ({ videoPath, videoDescription }) => {

  const { t } = useTranslation();
  return (
    <div>
      <h2> {t("Video")} </h2> 
      <p className="description"> {t(videoDescription)} </p>
      <video className='video-player'  controls>
        <source src={videoPath} type="video/mp4" />
      </video>
    </div>
  );
};

VideoPlayer.propTypes = {
    videoPath: PropTypes.string.isRequired,
    videoDescription: PropTypes.string
}

export default VideoPlayer;