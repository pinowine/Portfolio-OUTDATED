import Switch from 'react-switch';
import './header.css';
import { useTheme } from '../../context/useTheme';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';



const Header = () => {
	const { isDarkTheme, toggleTheme } = useTheme();
	const [isMobileMenuOpen, setISMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setISMobileMenuOpen(!isMobileMenuOpen);
	};

	const checkedHandleIcon = 
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
			fontSize: 20
		}}
		>
		✦
	</div>

	const uncheckedHandleIcon = 
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				fontSize: 20
			}}
			>
			☀
		</div>

	const { t } = useTranslation();
	const { i18n } = useTranslation();

	const options = [
		{ value: 'en-us', label: i18n.t('English') },
		{ value: 'zh-cn', label: i18n.t('简体中文') },
		{ value: 'zh-hk', label: i18n.t('繁体中文') },
	];

	const customStyles = {
		control: (styles, { isFocused }) => ({
			...styles,
			backgroundColor: 'var(--background-color)',
			borderColor: 'var(--circle-border)',
			color: 'var(--text-color)',
			boxShadow: isFocused ? '0 0 1px 1px var(--box-shadow)' : 'none', // 调整焦点时的阴影为相同的颜色
			"&:hover": {
				borderColor: isFocused ? 'var(--select-focus-border-color)' : 'var(--select-border-hover)',
			}
		}),
		menu: (styles) => ({
			...styles,
			backgroundColor: 'var(--background-color)'
		}),
		option: (styles, { isFocused, isSelected }) => ({
			...styles,
			backgroundColor: isSelected ? 'var(--background-color)' : isFocused ? 'var(--hover-bg-color)' : undefined,
			color: isSelected ? 'var(--light-text-color)' : isFocused ? 'var(--special-text)' : undefined,
			"&:active": {
				backgroundColor: 'var(--special-bg)'
			}
		}),
		singleValue: (styles) => ({
			...styles,
			color: 'var(--text-color)'
		}),
		placeholder: (styles) => ({
			...styles,
			color: 'var(--text-color)'
		})
	};

	// 处理选项变更
	const handleChange = selectedOption => {
		i18n.changeLanguage(selectedOption.value);
	};

	return (
		<div className={`nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
			{/* BLOCK ELEMENT MODIFIER */}
			<div className='nav__wrapper container'>
				<div className='nav__logo'>Drug Store</div>
				<ul className={`nav__menu ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
					<li className='nav__menu-items'>
						<a href='/#home'>{t('Home')}</a>
					</li>
					<li className='nav__menu-items'>
						<a href='/#skills'>{t('Skills')}</a>
					</li>
					<li className='nav__menu-items'>
						<a href='/#interests'>{t('Interests')}</a>
					</li>
					<li className='nav__menu-items'>
						<a href='/#portfolio'>{t('Portfolio')}</a>
					</li>
					<li className='nav__menu-items'>
						<a href='/#contact'>{t('Contact')}</a>
					</li>
					<li className='buttons'>
						<label htmlFor='' className='switch'>
							<Switch
								height={24}
								width={48}
								onColor='#4D4D4D'
								offColor='#ccc'
								onChange={toggleTheme}
								checked={isDarkTheme}
								checkedIcon={false}
								uncheckedIcon={false}
								uncheckedHandleIcon={ uncheckedHandleIcon }
								checkedHandleIcon={ checkedHandleIcon }
							/>
						</label>
						<label className='select'>
							<Select 
								options={options} 
								styles={customStyles}
								defaultValue={options.find(opt => opt.value === i18n.language)}
								onChange={handleChange}
								className="basic-single" 
								classNamePrefix="select"
							/>
						</label>
					</li>
				</ul>
			</div>
			<div className='hamburger-menu' onClick={toggleMobileMenu}>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
				<div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
			</div>
		</div>
	);
};

export default Header;
