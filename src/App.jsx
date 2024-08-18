import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import './i18n.js';
import portfolios from './utils/PortfolioData.js'
import PortfolioPage from './pages/PortfolioPage.jsx';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

function App() {
	
	return (
		<div className='app'>
			<ThemeProvider>
				<Header />
				<Router>
					<ScrollToTop />
					<Routes>
						<Route path='/' element={<Home />} />
						{portfolios.map((portfolio) => (
							<Route key={portfolio.id} path={`/portfolio/${portfolio.id}`} element={
								<PortfolioPage 
									portfolio={portfolio}
								/>
							} />
						))}
					</Routes>
				</Router>
			</ThemeProvider>
		</div>
	);
}

export default App;
