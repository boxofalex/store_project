import React, { Fragment } from 'react';

import styles from './Picture/module.scss';


const Picture = (props) => {

    sources = props.img.sources.map((source, index) => {
        return <source srcset={source.src} media={source.media} />
    })

   return <Fragment>
       <picture>
           {sources}
           <img src={props.img.mainSource} alt={props.img.alt}/>
       </picture>
   </Fragment>
}

export default Picture;
