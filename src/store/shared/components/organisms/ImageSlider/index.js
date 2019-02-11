import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Banner from '../Banner';

import styles from './ImageSlider.module.scss';
import { isAbsolute } from 'path';



const Slide = ({ image, index }) => {

   const stylesMain = {
     backgroundImage: `url(${image})`,
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: '50% 60%',
     width: '100%',
     height: '80vh',
     display: 'inline-block',
   }

   const stylesExtra = {
     backgroundImage: `url(${image})`,
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: '50% 60%',
     width: '100%',
     height: '80vh',
     position: 'absolute',
     left: '300%',
     top: '0',
     zIndex: '400'
   }

   if (index === 0) {
      return <Fragment>
          <div className={"slide"} style={stylesMain}></div>
          <div className={"slide"} style={stylesExtra}></div>
      </Fragment>
   }

   return <div className={"slide"} style={stylesMain}></div>
 }
 

class ImageSlider extends Component {

     constructor(props) {
         super(props);

         this.state = {
            currentIndex: 0,
            translateValue: 0,
            images: Object.values(this.props.data.imageSlider.items),
            playAnimation: true,
            interval: 4000,
         }

         this.autoChange = () => {
           
            if (this.state.currentIndex <= this.state.images.length - 1) {
                    
               return this.setState(prevState => ({

                  currentIndex: prevState.currentIndex + 1,
                  translateValue: prevState.translateValue + -(this.slideWidth()),
                  playAnimation: true,
               }));
            }
         }


         this.slideWidth = () => {

            return document.querySelector('.slide').clientWidth
         }
     }

   componentDidUpdate() {

      if (this.state.currentIndex === this.state.images.length) {

         setTimeout(() => {
            this.setState({
               currentIndex: 0,
               translateValue: 0,
               playAnimation: false,
            })
         }, 500)
      }
      return
   }

   componentDidMount() {
      
      let intervalId  =  setInterval(() => { this.autoChange(); }, this.state.interval)
      this.setState({intervalId: intervalId});
   }

   componentWillUnmount() {

      clearInterval(this.state.intervalId);
   }

     
   render() {

         const {images, playAnimation} = this.state;

         const wrapperStyle = {
            transform: `translateX(${this.state.translateValue}px)`,
            transition: playAnimation ? 'transform ease-out 0.45s' : '',
            position: 'relative'
         };

         return <Fragment>
            <div className={styles.imageSlider}>
                 <div style={wrapperStyle} className={styles.imageSliderWrapper}>
                        { images.map((image, i) => (
                           <Slide key={i} index={i} image={image} />
                        ))}
                  </div>
            </div>
         </Fragment>
   }
}


export default ImageSlider;