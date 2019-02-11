import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getThemeSettings, getText } from '../../../lib/settings';


import styles from './AttributeFilter.module.scss';



class AttributeValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
        };
        

	    this.onChange = event => {
		const {
			attributeName,
			valueName,
			setFilterAttribute,
			unsetFilterAttribute
        } = this.props;
        
		const checked = event.target.checked;

		this.setState({ checked: checked });

		if (checked) {
			setFilterAttribute(attributeName, valueName);
		} else {
			unsetFilterAttribute(attributeName, valueName);
		}
	};

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({ checked: nextProps.checked });
		}
	}

	render() {
		const { valueName, count } = this.props;
		const isDisabled = count === 0;
		const classChecked = this.state.checked ? styles.checked : '';
		const classDisabled = isDisabled ? styles.disabled : '';

		return (
            <span className={styles.attributeValue}>
              <label className={classChecked + ' ' + classDisabled}>
				 <input type="checkbox" disabled={isDisabled} onChange={this.onChange} checked={this.state.checked}/>
				  {valueName}
			  </label>
            </span>
		);
	}
}



const AttributeSet = ({
	attribute,
	setFilterAttribute,
	unsetFilterAttribute
}) => {
   
	const values = attribute.values.map((value, index) => (
		<AttributeValue
			key={index}
			attributeName={attribute.name}
			valueName={value.name}
			checked={value.checked}
			count={value.count}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return (
		<div className={styles.attributeSet}>
            <div className={styles.attributeName}>
                {'by ' + attribute.name}
            </div>
            <div className={styles.attributeValues}>
                 {values}
            </div>
		</div>
	);
};




const AttributeFilter = ({
	attributes,
	setFilterAttribute,
	unsetFilterAttribute
}) => {

	const attributeSets = attributes.map((attribute, index) => (
		<AttributeSet
			key={index}
			attribute={attribute}
			setFilterAttribute={setFilterAttribute}
			unsetFilterAttribute={unsetFilterAttribute}
		/>
	));

	return <div>{attributeSets}</div>;
};


export default AttributeFilter;