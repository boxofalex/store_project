import React, { Fragment, Component } from 'react';
import BurgerMenu from './BurgerMenu';
import CartIndicator from './CartIndicator';
import { NavLink } from 'react-router-dom';

import styles from './MobileBar.module.scss';

const MobileBar = (props) => {
    
    const {
        icons,
        onClickAction,
        mobileMenuIsActive,
        logo,
        cartIsActive,
        cartToggle,
        cart,
        searchToggle
    } = props;

    return   <div className={styles.mobileBar}>
                    <div className={styles.logo}>
                        <NavLink to="/">
                            <span>
                                <img src={logo}/>
                            </span>
                        </NavLink>
                    </div>
                    <div className={styles.mobileBarIcons}>
                         <div className={styles.search}>
                            <span onClick={searchToggle}>
                                <img src={icons.search}/>
                            </span>
                         </div>
                         <div className={styles.cart}>
                            <span >
                                <CartIndicator cart={cart} onClick={cartToggle}
                                cartIsActive={cartIsActive}/>
                            </span>
                         </div>
                         <div className={styles.burgerMenu}> 
                                <BurgerMenu onClickAction={onClickAction} isRotate={mobileMenuIsActive} classes={[]}/>
                         </div>
                    </div>
            </div>
}

export default MobileBar;