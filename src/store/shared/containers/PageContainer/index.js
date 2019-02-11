import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';



const PageContainer = (props) => {

    return <h1>Page Container</h1>
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(PageContainer)
);