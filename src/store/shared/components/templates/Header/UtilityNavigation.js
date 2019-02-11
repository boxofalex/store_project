import React, { Fragment, Component } from 'react';
import CartIndicator from './CartIndicator';

import styles from './UtilityNavigation.module.scss';


const UtilityNavigation = (props) => {
     
    const {
        icons,
        text,
        cart,
        onClick,
        cartIsActive
    } = props
    
    return  <div className={styles.utilityContainer}>
                <nav className={styles.utilityNavigation}>
                    <ul>
                        <li className={styles.utilityItem}>
                        <span><img src={icons.flag.usa}/></span>
                        <span>{text.flag}</span>
                        </li>
                        <li className={styles.utilityItem}> 
                            <span><img src={icons.point}/></span>
                            <span>{text.findAStore}</span>
                        </li>
                        <li className={styles.utilityItem}>
                            <span><img src={icons.question}/></span>
                            <span>{text.help}</span>
                        </li>
                        <li className={styles.utilityItem}>
                            <span><img src={icons.user}/></span>
                            <span>{text.signin}</span>
                        </li>
                        <li className={[styles.utilityItem, styles.cartIndicator].join(' ')}>
                            <CartIndicator 	cart={cart} onClick={onClick}
							cartIsActive={cartIsActive}/>
                            <span></span>
                        </li>
                    </ul>
                </nav>
            </div>
}

export default UtilityNavigation;