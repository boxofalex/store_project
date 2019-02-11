import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as helper from '../../../lib/helper';

import styles from './Item.module.scss';

const Item = (props) => {

    const {
        product,
        addCartItem,
        settings
    } = props;


    return <Fragment>
        <NavLink to={product.path}> 
          <div className={styles.product}>
            <div className={styles.productImage}>
                <img src={product.image}/>
            </div>
            <div className={styles.productDetails}>
               <h3>{product.name}</h3>
               <div>
                   {helper.formatCurrency( product.regular_price, settings)}
               </div>
            </div>
        </div>
        </NavLink>
    </Fragment>
}


export default Item;