import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getThemeSettings } from '../../lib/settings';
import withDimenstions from '../../lib/isMobile';
import ImageSlider from '../../components/organisms/ImageSlider';
import InfoTile from '../../components/organisms/InfoTile';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';


import styles from './Index.module.scss';


const IndexContainer = (props) => {
	
	const { 
		addCartItem,
		state: {pageDetails, settings}
	} = props;

	const themeSettings = getThemeSettings();
	const index = themeSettings.index;
	const infoBlocks = themeSettings.index.infoBlocks.items;
	
    return <Fragment>
		<ImageSlider data={index} isMobile={props.isMobile}/>
		<div className={styles.infoBlocks}>
		    {Object.entries(infoBlocks).map(([block, details]) => {
               return  <InfoTile key={block} data={details}/>
			})}
		</div>
	</Fragment>
}


IndexContainer.propTypes = {
	addCartItem: PropTypes.func.isRequired,
	state: PropTypes.shape({
		settings: PropTypes.shape({}),
		pageDetails: PropTypes.shape({})
	}).isRequired
};

export default  withDimenstions(withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(IndexContainer)
));