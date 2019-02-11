import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { getThemeSettings, getText } from '../../../lib/settings';


import styles from './CartIndicator.module.scss';

const CartCount = ({ cart }) => {

	if (cart && cart.items && cart.items.length > 0) {
		const itemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);
		return <span className={styles.count}>{itemsCount}</span>;
	}
	return <span></span>;
};


const CartIcon = ({ cartIsActive, cart }) => {

	const text = getText();
	let img;
	
	if (cart && cart.items && cart.items.length > 0) {
        img = <span>
		 <img
		   src="/assets/images/full-cart.png"
		   alt={text.close}
		   title={text.close}
		 />
	    </span>
	} else {
		img = <span>
		<img
			src="/assets/images/cart.png"
			alt={text.cart}
			title={text.cart}
		/>
	    </span>
	}

	if (cartIsActive) {
		return (
			<span>
				<img
				  src="/assets/images/close-cart.png"
				  alt={text.close}
				  title={text.close}
				/>
			</span>
		
		);
	}
	return img;
};

export default class CartIndicator extends React.PureComponent {

	render() {
		const { cart, onClick, cartIsActive } = this.props;
		return <Fragment>
            <span  onClick={onClick}>
				<CartIcon cartIsActive={cartIsActive} cart={cart} />
				<CartCount cart={cart} />
			</span>
        </Fragment>
			
	}
}
