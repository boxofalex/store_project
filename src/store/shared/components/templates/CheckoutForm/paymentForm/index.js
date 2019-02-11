import React, { Fragment, Component } from 'react';
import { getApi, getApiAjax } from '../../../../lib/settings';
// import PayPalCheckout from './PayPalCheckout';
// import LiqPay from './LiqPay';
import StripeElements from './StripeElements';

export default class PaymentForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			formSettings: null,
			loading: false
		};

		
		this.fetchFormSettings = () => {
			const apiAjax = getApiAjax();
			this.setState({
				loading: true
			});
	
			apiAjax.get('/payment_form_settings')
				.then(({ status, data }) => {
				
					this.setState({
						formSettings: data,
						loading: false
					});
				})
				.catch(e => {
					this.setState({
						formSettings: null,
						loading: false
					});
				  console.log(e);
				});
		};
	}


	componentDidMount() {
		this.fetchFormSettings();
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.gateway !== this.props.gateway ||
			nextProps.amount !== this.props.amount
		) {
			this.fetchFormSettings();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.gateway !== this.props.gateway ||
			nextProps.amount !== this.props.amount ||
			this.state !== nextState
		);
	}

	render() {
		const { gateway, shopSettings, onPayment, onCreateToken } = this.props;
		const { formSettings, loading } = this.state;

		if (loading) {
			return null;
		} else if (formSettings && gateway && gateway !== '') {
			switch (gateway) {
				case 'paypal-checkout':
				return
					// return (
					// 	<div >
					// 		<PayPalCheckout
					// 			formSettings={formSettings}
					// 			shopSettings={shopSettings}
					// 			onPayment={onPayment}
					// 		/>
					// 	</div>
					// );
				case 'liqpay':
				return
					// return (
					// 	<div >
					// 		<LiqPay
					// 			formSettings={formSettings}
					// 			shopSettings={shopSettings}
					// 			onPayment={onPayment}
					// 		/>
					// 	</div>
					// );
				case 'Stripe':
					return <Fragment>
						
						<StripeElements
								formSettings={formSettings}
								shopSettings={shopSettings}
								onPayment={onPayment}
								onCreateToken={onCreateToken}
						/>

					</Fragment>
							
				default:
					return (
						<div>
							Payment Gateway <b>{gateway}</b> not found!
						</div>
					);
			}
		} else {
			return null;
		}
	}
}
