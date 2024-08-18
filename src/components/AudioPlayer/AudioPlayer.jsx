import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './AudioPlayer.css'

const AudioPlayer = ({audioPath, audioDescription }) => {

  const { t } = useTranslation();

  return (
    <div>
      <h2> {t("Audio")} </h2>
      <p className="description"> {t(audioDescription)} </p>
      <audio controls>
        <source src={audioPath} type="audio/mp3" />
      </audio>
    </div>
  );
};

AudioPlayer.propTypes = {
    audioPath: PropTypes.string.isRequired,
    audioDescription: PropTypes.string
}

export default AudioPlayer;
