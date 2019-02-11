import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import OrderSummary from '../../components/templates/OrderSummary';
import CheckoutForm from '../../components/templates/CheckoutForm';
import withDimenstions from '../../lib/isMobile';


import styles from './Checkout.module.scss';

const CheckoutContainer = (props) => {

	const {
		state: { pageDetails }
	} = props;

    return <Fragment>
		<div className={styles.checkoutArea}>
		    <div className={styles.checkoutForm}>
			     <CheckoutForm {...props}/>
			</div>
			<div className={styles.checkoutSummary}>
                 <OrderSummary {...props}/>
			</div>
		</div>
	</Fragment>
}


CheckoutContainer.propTypes = {
	state: PropTypes.shape({
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default withDimenstions(withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CheckoutContainer)
));