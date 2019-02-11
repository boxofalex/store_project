import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './InfoTile.module.scss';


const InfoTile = props => {


    return <Fragment>
      <div className={styles.infoTile}>
          <Link to={props.data.link}>     
               <div className={styles.image}>
                   <img src={props.data.pic}/>
                </div>
          </Link>
          <div className={styles.title}>{props.data.title}</div>
          <div className={styles.text}>{props.data.text}</div>
      </div>

    </Fragment>
}


export default InfoTile;