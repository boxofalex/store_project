import React, { Fragment, Component } from 'react';
import Header from '../../components/templates/Header';
import Footer from '../../components/templates/Footer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import withDimenstions from '../../lib/isMobile';
import { mapStateToProps, mapDispatchToProps } from '../../containerProps';
import styles from './Shared.module.scss';



const SharedContainer = (props) => {
    
     const {
         children,
         state: { currentPage, settings}
     } = props;



    return <Fragment>
        <Header {...props} />
        <section className={styles.main}>
             {props.children}
        </section>
        <Footer data={props} />
   </Fragment>  
}



export default withDimenstions(withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(SharedContainer)
));
