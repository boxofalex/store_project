import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
// import CardSection from './CardSection';

import styles from './CheckoutForm.module.scss';

class CheckoutForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inProgress: false
		};
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {

		this.setState({
			inProgress: true
		});

		const { formSettings, onCreateToken, stripe } = this.props;

		const { token } = await stripe.createToken({
			name: formSettings.email
		});

		if (token && token !== 'undefined') {

			onCreateToken(token.id);
		} else {

			this.setState({
				inProgress: false
			});
		}
	}

	render() {

		const { inProgress } = this.state;

		return (
			<div className={styles.paymentForm}> 
				<div className={styles.paymentTitle}>
                   <h3>Pay here</h3>
				</div>
				<CardElement />
				<div className={styles.paymentButton}>
				    <button onClick={this.submit} disabled={inProgress}>
						Confirm order
					</button>
				</div>
			</div>
		);
	}
}
export default injectStripe(CheckoutForm);
