import { RiDoubanFill } from "react-icons/ri";
import { IoLogoWechat } from "react-icons/io5";
import { FaBilibili } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import HeroImg from '../assets/dev.png';
import { cards } from '../utils/Data';
import { v4 as uuid } from 'uuid';
import { useEffect, useRef } from 'react';
import './home.css';
import Card from '../components/card/Card';
import { useTranslation } from 'react-i18next';

import PortfolioTemplate from '../components/portfolio/PortfolioTemplate.jsx';
import portfolios from "../utils/PortfolioData.js";

const Home = () => {
	const skillRef = useRef(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animateProgressbar();
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(skillRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	const animateProgressbar = () => {
		const progressBars = document.querySelectorAll('.skill__progress-line');

		progressBars.forEach((progressBar) => {
			const percent = progressBar.getAttribute('data-width');
			progressBar.style.width = `${percent}%`;
		});
	};

	const { t } = useTranslation();

	return (
		<div className='container home'>
			<section className='hero-section' id='home'>
				<div className='hero-section__left'>
					<div className='hero-section__special-text'>
						{t('Hello!')}
					</div>
					<div className='hero-section__paragraph'>
						<h3>
							{t('I\'m an undergraduate student at ZJU,')}<br/> {t('major in landscape, a gamer and a design enthusiast.')}
						</h3>
					</div>
					<a href='/resume.pdf' download='resume.pdf' className='button'>
						{t('Get Resume')}
					</a>
				</div>
				<div className='hero-section__right'>
					<div className='hero-section__image'>
						<img src={HeroImg} alt='hero image' />
						<div className='hero-section__image-half-round-shape'></div>
						<div className='social-links'>
							<a href='https://www.douban.com/people/192041489/?_i=3944320GoLuv42'>
								<RiDoubanFill />
							</a>
							<a href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3NDYzODk3Nw==&scene=124#wechat_redirect'>
								<IoLogoWechat  />
							</a>
							<a href='https://space.bilibili.com/22824068'>
								<FaBilibili />
							</a>
							<a href='https://github.com/pinowine'>
								<FaGithub />
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className='services' id='skills'>
				<h3 className='section__label'>{t('Skills')}</h3>
				<h2 className='section__title'>{t('Multiple Fields of Experience')}</h2>
				<div className='cards'>
					{cards?.map((card) => (
						<Card
							key={uuid()}
							icon={card?.icon}
							title={card?.title}
							features={card?.features}
						/>
					))}
				</div>
			</section>

			<section className='skill' id='interests' ref={skillRef}>
				<div className='skill__left'>
					<h3 className='section__label'>{t('Interests')}</h3>
					<h2 className='section__title'>{t('My skills in my interested fileds are')}</h2>
				</div>
				<div className='skill__right'>
					<div className='skill__wrapper'>
						<div className='skill__tag'>{t('Graphic Design/Visual Identity Planning')}</div>
						<div className='skill__box'>
							<div className='skill__progress-line' data-width='95'></div>
							<div className='skill__percentage'>95%</div>
						</div>
					</div>
					<div className='skill__wrapper'>
						<div className='skill__tag'>{t('UX/User Research/Service Design')}</div>
						<div className='skill__box'>
							<div className='skill__progress-line' data-width='85'></div>
							<div className='skill__percentage'>85%</div>
						</div>
					</div>
					<div className='skill__wrapper'>
						<div className='skill__tag'>{t('Developing/3D Modeling')}</div>
						<div className='skill__box'>
							<div className='skill__progress-line' data-width='55'></div>
							<div className='skill__percentage'>55%</div>
						</div>
					</div>
					<div className='skill__wrapper'>
						<div className='skill__tag'>{t('Intergrated Media')}</div>
						<div className='skill__box'>
							<div className='skill__progress-line' data-width='50'></div>
							<div className='skill__percentage'>50%</div>
						</div>
					</div>
				</div>
			</section>

			<section className='portfolio' id='portfolio'>
				<h3 className='section__label'>{t('My Portfolio')}</h3>
				<h2 className='section__title'>{t('My Complete Projects')}</h2>
				<p className='section__label'>{t('Relatively large projects that I completed mostly independently.')}</p>

				<div className='portfolio__grid'>
					{portfolios.map((portfolio) => {
						if (portfolio && portfolio.type === 'complete') {
							return <PortfolioTemplate key={portfolio.id} portfolio={portfolio} />;
						}
						return null;
					})}
				</div>

				<h2 className='section__title'>{t('My Collaborative Projects')}</h2>
				<p className='section__label'>{t('Working as a member of a team or collaborating with others to complete tasks.')}</p>
				<div className='portfolio__grid'>
					{portfolios.map((portfolio) => {
						if (portfolio && portfolio.type === 'group') {
							return <PortfolioTemplate key={portfolio.id} portfolio={portfolio} />;
						}
						return null;
					})}
				</div>

				<h2 className='section__title'>{t('My Major Projects')}</h2>
				<p className='section__label'>{t('Complete projects in my major field of landscape design typically involve teamwork.')}</p>
				<div className='portfolio__grid'>
					{portfolios.map((portfolio) => {
						if (portfolio && portfolio.type === 'major') {
							return <PortfolioTemplate key={portfolio.id} portfolio={portfolio} />;
						}
						return null;
					})}
				</div>

				<h2 className='section__title'>{t('My Personal Projects')}</h2>
				<p className='section__label'>{t('Designs stemming from personal interests or small commissions are often expressed personally.')}</p>
				<div className='portfolio__grid'>
					{portfolios.map((portfolio) => {
						if (portfolio && portfolio.type === 'personal') {
							return <PortfolioTemplate key={portfolio.id} portfolio={portfolio} />;
						}
						return null;
					})}
				</div>

			</section>

			<div className='contact' id='contact'>
				<h3 className='section__label'>{t('Contact')}</h3>
				<h2 className=' section__title'>{t('Common Contact Information')}</h2>
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
		</div>
	);
};

export default Home;
