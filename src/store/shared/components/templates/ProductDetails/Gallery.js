import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import Lightbox from 'react-image-lightbox';
import * as helper from '../../../lib/helper';
import { getThemeSettings, getText } from '../../../lib/settings';

import styles from './Gallery.module.scss';

export default class Gallery extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			lightboxIsOpen: false,
			lightboxPhotoIndex: 0
		};
	}

	openLightbox () {
		this.setState({ lightboxIsOpen: true });
	};

	closeLightbox () {
		this.setState({ lightboxIsOpen: false });
	};

	setPhotoIndex (index) {
		this.setState({ lightboxPhotoIndex: index });
	};

	render() {

        const { lightboxIsOpen, lightboxPhotoIndex } = this.state;
        const themeSettings = getThemeSettings();
        const othersSettings = themeSettings.others;

		// if (images && images.length > 0) {
		// 	const imagesArray = images.map(image => ({
		// 		original: helper.getThumbnailUrl(
		// 			image.url,
		// 			themeSettings.bigThumbnailWidth
		// 		),
		// 		thumbnail: helper.getThumbnailUrl(
		// 			image.url,
		// 			themeSettings.previewThumbnailWidth
		// 		),
		// 		originalAlt: image.alt ? image.alt : '',
		// 		thumbnailAlt: image.alt ? image.alt : ''
		// 	}));

		let imagesArray;

		if (this.props.images) {
			
			console.log(this.props.images.length);

			if (this.props.images.length > 1) {

				    imagesArray = this.props.images.map(([original, thumbnail]) => ({
					original: original,
					thumbnail: thumbnail,
					originalClass: styles.originalImage,
					thumbnailClass: styles.thumbnailImage,
					// originalAlt: image.alt ? image.alt : '',
					// thumbnailAlt: image.alt ? image.alt : ''
			    }));
			} else {

				imagesArray = [this.props.images];
			}
	
		
        // const originalImages = images;
        // .map(image => image.url);
        // const showThumbnails = images.length > 1;

		return <Fragment>
					 <ImageGallery
						items={imagesArray}
						showThumbnails={true}
						// onClick={this.openLightbox}
						// lazyLoad={true}
						// slideInterval={2000}
						thumbnailPosition={'left'}
                        showNav={false}
                        // showNav={othersSettings.product_gallery_shownav === true}
                        // showBullets={true}
						// showBullets={showThumbnails}
                        showPlayButton={false}
						showFullscreenButton={false}
						disableArrowKeys={false}
						lazyLoad={true}
						// slideOnThumbnailHover={true}
						// thumbnailPosition={othersSettings.product_thumbnail_position}
						// onSlide={this.setPhotoIndex}
						additionalClass={styles.container}
					/>
					{/* {lightboxIsOpen && (
						<Lightbox
							reactModalStyle={{ overlay: { zIndex: 1099 } }}
							mainSrc={originalImages[lightboxPhotoIndex]}
							nextSrc={
								originalImages[(lightboxPhotoIndex + 1) % originalImages.length]
							}
							prevSrc={
								originalImages[
									(lightboxPhotoIndex + originalImages.length - 1) %
										originalImages.length
								]
							}
							onCloseRequest={this.closeLightbox}
							onMovePrevRequest={() =>
								this.setState({
									lightboxPhotoIndex:
										(lightboxPhotoIndex + originalImages.length - 1) %
										originalImages.length
								})
							}
							onMoveNextRequest={() =>
								this.setState({
									lightboxPhotoIndex:
										(lightboxPhotoIndex + 1) % originalImages.length
								})
							}
						/>
					)} */}
				</Fragment> 

		} else {

			return <div>Loading</div>
		}
		
		// } else {
		// 	return <div className="large-image-placeholder" />;
		// }
	}
}
