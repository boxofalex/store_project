import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { getThemeSettings, getText } from '../../../lib/settings';
import * as helper from '../../../lib/helper';


import styles from './Cart.module.scss';

const CartItem = ({ item, deleteCartItem, settings }) => {
	
	const text = getText();
     
	return (
		<div className={styles.productDetails}>
			<div className={styles.productImage}>
					<NavLink to={item.path}>
						<img src={item.image_url} />
					</NavLink>
			</div>
			<div className={styles.productNameQuantity}>
				<div className={styles.productName}>
					<NavLink to={item.path}>{item.name}</NavLink>
				</div>
				{item.variant_name.length > 0 && (
					<div>{item.variant_name}</div>
				)}
				<div className={styles.Qunatity}>
					{text.qty}: {item.quantity}
				</div>
			</div>
			<div className={styles.productPriceRemove}>
				<div className={styles.productPrice}>
					{helper.formatCurrency(item.price_total, settings)}
				</div>
				<div className={styles.productRemove}>
				    <a className={styles.remove}onClick={() => deleteCartItem(item.id)}> {text.remove}</a>
				</div>
			</div>
		</div>
	);
};

export default class Cart extends React.PureComponent {

    
	render() {
		const { cart, deleteCartItem, settings, cartToggle, cartIsActive } = this.props;
		const text = getText();
		const themeSetting = getThemeSettings();
		const general = themeSetting.general;

		if (cart && cart.items && cart.items.length > 0) {
			const items = cart.items.map(item => (
				<CartItem
					key={item.id}
					item={item}
					deleteCartItem={deleteCartItem}
					settings={settings}
				/>
			));

			return <Fragment>
				<div className={styles.cart}>
					{items}
					<div className={styles.line}/>
					<div className={styles.totalArea}>
					    <div></div>
						<div></div>
					    <div className={styles.totalSubArea}>
							<div className={styles.totalTitle}>
								<b>{text.subtotal}</b>
							</div>
							<div className={styles.total}>
								<b>{helper.formatCurrency(cart.subtotal, settings)}</b>
							</div>
						</div>
						<div className={styles.checkoutLink}>
								<NavLink to="/checkout" onClick={cartToggle}>
									{text.proceedToCheckout}
								</NavLink>
						</div>
					</div>
					<span className={styles.closeButton} onClick={this.props.cartToggle}>
                        <img src={general.icons.close}/>
                    </span>
				</div>
			</Fragment>
		}
		return (
			<div className={styles.empty}>
				<h2>{text.cartEmpty}</h2>
				<span className={styles.closeButton} onClick={this.props.cartToggle}>
                        <img src={general.icons.close}/>
                </span>
			</div>
		);
	}
}