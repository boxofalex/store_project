import React, { Fragment, Component } from 'react';

import Cart from './Cart';
import MobileBar from './MobileBar';
import MainNav from './MainNav';
import SearchBox from './SearchBox';
import UtilityNavigation from './UtilityNavigation';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './Header.module.scss';


class Header extends Component {

    constructor(props){
		super(props)
		
		this.state = {
			mobileMenuIsActive: false,
			mobileSearchIsActive: false,
            cartIsActive: false,
        };

		this.menuToggle = () => {
			this.setState({
				mobileMenuIsActive: !this.state.mobileMenuIsActive,
				cartIsActive: false,
				mobileSearchIsActive: false
			});
			document.body.classList.toggle('noscroll');
		};


		this.searchToggle = () => {
			this.setState({
				mobileSearchIsActive: !this.state.mobileSearchIsActive,
				cartIsActive: false,
				mobileMenuIsActive: false
			});
			document.body.classList.toggle('search-active');
		};


		this.menuClose = () => {
			this.setState({ mobileMenuIsActive: false });
			document.body.classList.remove('noscroll');
		};

		this.closeAll = () => {
			this.setState({
				cartIsActive: false,
				mobileMenuIsActive: false
			});
			document.body.classList.remove('noscroll');
		};

		this.cartToggle = () => {
			this.setState({
				cartIsActive: !this.state.cartIsActive,
				mobileMenuIsActive: false,
				mobileSearchIsActive: false
			});
			document.body.classList.toggle('noscroll');
		};

		this.showCart = () => {
			this.setState({
				cartIsActive: true,
				mobileMenuIsActive: false
			});
			document.body.classList.add('noscroll');
		};

		this.handleSearch = search => {
			if (this.props.state.currentPage.path === '/search') {
				this.props.setSearch(search);
			} else {
				if (search && search !== '') {
					this.props.setLocation('/search?search=' + search);
				}
			}
		};

		this.handleGoBack = () => {
			this.closeAll();
			this.props.goBack();
		};
    }


	render() {
		
		const {
			categories,
			cart,
			settings,
			currentPage,
			location,
			productFilter
		} = this.props.state;

	
		const themeSettings = getThemeSettings();
		const logo = themeSettings.header.logo;
		const utilities = themeSettings.header.utilities;
		const mobileBar = themeSettings.header.mobileBar;
		const searchBar = themeSettings.header.searchBar;
		const mainNavigation = themeSettings.header.mainNavigation;
		const text = getText();


		return <Fragment>
			<section className={styles.headerSection}>
			    <header className = {[styles.header, this.state.mobileSearchIsActive ? styles.searchActive : ''].join(' ')}>
					<div className={styles.container}>
							<MobileBar text={text} icons={mobileBar.icons} onClickAction={this.menuToggle} mobileMenuIsActive={this.state.mobileMenuIsActive} logo={logo} cartIsActive={this.state.cartIsActive} cartToggle={this.cartToggle} cart={cart}
							searchToggle={this.searchToggle}/>
							<UtilityNavigation text={text} icons={utilities.icons} cart={cart} onClick={this.cartToggle} cartIsActive={this.state.cartIsActive}/>
							<SearchBox text={text} icons={searchBar.icons} onSearch={this.handleSearch} mobileSearchIsActive={this.state.mobileSearchIsActive} />
							<div className={[styles.cartContainer, !this.state.cartIsActive ? styles.hidden : ''].join(' ')}>
								<Cart cart={cart} deleteCartItem={this.props.deleteCartItem} settings={settings} cartToggle={this.cartToggle}  cartIsActive={this.state.cartIsActive}/>
							</div>
							<MainNav categories={categories} text={text} mobileMenuIsActive={this.state.mobileMenuIsActive} mainNavigation={mainNavigation}
							isMobile={this.props.isMobile}/>
					</div>
				</header>
			</section>
		</Fragment>
	}  
}

export default Header;