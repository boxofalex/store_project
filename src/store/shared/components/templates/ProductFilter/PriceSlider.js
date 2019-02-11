import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Range } from 'rc-slider';
import { getThemeSettings, getText } from '../../../lib/settings';
import * as helper from '../../../lib/helper';





import styles from './PriceSlider.module.scss';


export default class PriceSlider extends React.Component {
	constructor(props) {
       
		super(props);
		this.state = {
			minValue: props.minValue > 0 ? props.minValue : props.minPrice,
			maxValue: props.maxValue > 0 ? props.maxValue : props.maxPrice
        };
        
        this.setValues = values => {
            if (Array.isArray(values) && values.length === 2) {
                this.setState({
                    minValue: values[0],
                    maxValue: values[1]
                });
            }
        };
	}

	componentWillReceiveProps(nextProps) {
     
		if (
			nextProps.minPrice !== this.props.minPrice ||
			nextProps.maxPrice !== this.props.maxPrice
		) {
			this.setState({
				minValue: nextProps.minPrice,
				maxValue: nextProps.maxPrice
			});
		}
    }
    

	render() {
        const text = getText();
        const { minPrice, maxPrice, minValue, maxValue, setPriceFromAndTo, settings } = this.props;
        

		return (
			<div className={styles.priceSlider}>
                <div className={styles.priceTitle}>
                    {'by ' + text.price}
                </div>
                <div className={styles.priceRange}>
                    <Range min={minPrice} max={maxPrice} value={[this.state.minValue, this.state.maxValue]}  onAfterChange={values => {setPriceFromAndTo(...values);}} onChange={this.setValues} railStyle={{ backgroundColor: '#f0efef' }} trackStyle={[{backgroundColor: '#5e5e5e' }]} handleStyle={[{ backgroundColor: '#ff7b00', border: 'none'}, {backgroundColor: '#ff7b00',  border: 'none'}]} step={0.01}/>
                </div>
				<div className={styles.priceIndicators}>
					<div>
						{helper.formatCurrency(this.state.minValue, settings)}
					</div>
					<div>
						{helper.formatCurrency(this.state.maxValue, settings)}
					</div>
				</div>
			</div>
		);
	}
}

