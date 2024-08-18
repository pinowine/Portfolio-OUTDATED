import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWechat } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

import './Footer.css';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <section className="contact">
            <div className='contact portfolio-page' id='contact'>
                <h3 className='section__label'>{t('Contact')}</h3>
                <div className="contact_container">
                    <div className="contact_item">
                        <FaPhone />
                        <span className="contact_name">{t('Phone')}</span>
                        <p className="contact_number">15355584087</p>
                    </div>
                    <div className="contact_item">
                        <MdEmail />
                        <span className="contact_name">{t('E-mail')}</span>
                        <p className="contact_number">chenzeyuan36@gmail.com</p>
                        <p className="contact_number">692975193@qq.com</p>
                    </div>
                    <div className="contact_item">
                        <IoLogoWechat />
                        <span className="contact_name">{t('WeChat')}</span>
                        <p className="contact_number">15355584087</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer