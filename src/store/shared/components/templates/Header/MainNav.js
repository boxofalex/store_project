import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MainNav.module.scss';


class HeadMenuItem extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        isActive: false,
        isActiveSubNav: false
      };
    
		  this.onMouseEnterHandler = () => {

        if (!this.props.isMobile && this.props.level === 1) {
          this.setState({
            isActive: true
          });
        }
    };
    
    this.onClickHandler = () => {

      if (!this.props.isMobile && this.props.level === 1) {
        this.setState({
          isActive: true
        });
      }
    };

    this.toggleSubNav  = () => this.setState({
    isActiveSubNav: !this.state.isActiveSubNav
    });

		this.onMouseLeaveHandler = () => {
			if (!this.props.isMobile && this.props.level === 1) {
				this.setState({
					isActive: false
				});
			}
		};

		this.isActiveToggle = () => this.setState({
			isActive: !this.state.isActive
    });
    
  }


  render() {
  
    const { categories, category, level, isMobile, mainNavigation } = this.props;

  

    const items = categories.filter(item => item.parent_id === category.id).map((subcategory, index) => (
    
        <HeadMenuItem key={index} category={subcategory} categories={categories} level={level + 1} isMobile={isMobile}  mainNavigation={mainNavigation}/>
    ));

    const hasItems = items.length > 0;

    return <Fragment>

    <li onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler} 
    onMouseUp={this.onMouseLeaveHandler} onClick={this.onClickHandler} 
    className={[this.state.isActive ? styles.active : '', hasItems ? styles.hasItems : ''].join(' ')} >
      
         <div className={styles.catParent}>
           <span className={level === 1 ? styles.mainCategoryTitle : ''}>
            <NavLink activeClassName={[styles.isActive, hasItems ? styles.hasItems : ''].join(' ')} to={category.path} >
                {category.name}
            </NavLink>
           </span>
           {level === 1 || level == 2 ? <span className={this.state.isActiveSubNav ? styles.rotate : ''} onClick={this.toggleSubNav}><img  src={mainNavigation.icons.arrowRound}/></span> : ''}
         </div>

          {hasItems && (
					<ul className={[level === 1 ? styles.navLevel1 : styles.navLevel2, this.state.isActiveSubNav ? styles.activeSubMenu : ''].join(' ')}>
                {level === 1 ? <div className={styles.shopAll}>
                <span>
                    <NavLink  to={category.path}>
                        Shop all
                    </NavLink>
                </span>
                </div> : ''}
                {items}
					</ul>
				)}
    </li>

    </Fragment>
  }
}




class MainNav extends React.PureComponent {


	render() {
  
    const { categories, text, isMobile, mobileMenuIsActive, mainNavigation } = this.props;
    
    const menuItems = [...categories];
    
    const items = menuItems.filter(category => category.parent_id === null).map((category, index) => (
   
       <HeadMenuItem key={index} category={category}  categories={categories} level={1} isMobile={isMobile} mainNavigation={mainNavigation} />
    ));

		return <div className={[styles.mainNavigation, mobileMenuIsActive ? styles.isToggled : ''].join(' ')}>
        <ul className={styles.navLevel0}>
           {items}
        </ul>
    </div>
  
   }
}


export default MainNav;

