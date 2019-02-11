import React, { Fragment } from 'react';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './Quantity.module.scss';


export default class Quantity extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		};


		this.handleChange = (event) => {

			this.setQuantity(event.target.value);
		};

		this.setQuantity = (quantity) => {
			const intQuantity = parseInt(quantity);
			if (intQuantity > 0 && intQuantity <= this.props.maxQuantity) {
				this.setState({ quantity: intQuantity });
				this.props.onChange(intQuantity);
			}
		};

		this.increment = () =>  {
			const newQuantity = this.state.quantity + 1;
			this.setQuantity(newQuantity);
		};

		this.decrement = () =>  {
			const newQuantity = this.state.quantity - 1;
			this.setQuantity(newQuantity);
		};
	}


	componentWillReceiveProps(nextProps) {
		if (this.state.quantity > nextProps.maxQuantity) {
			this.setQuantity(nextProps.maxQuantity);
		}
	}

	
	render() {
		const { maxQuantity } = this.props;
		const { quantity } = this.state;
		const disabled = maxQuantity === 0;
		const themeSettings = getThemeSettings();
		const general = themeSettings.general;
		const value = disabled ? 0 : quantity;

		return (
			<Fragment>
				<div className={styles.handle}>
					<a className={styles.decrement}  onClick={this.decrement} >
					   <img src={general.icons.minusButton}/>
					</a>
					<input
						value={value}
						onChange={this.handleChange}
						maxLength="3"
						type="number"
						pattern="\d*"
						disabled={disabled}
					/>
					<a className={styles.increment}  onClick={this.increment} >
					    <img src={general.icons.plusButton}/>
					</a>
				</div>
			</Fragment>
		);
	}
}
