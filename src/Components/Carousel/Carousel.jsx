import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.css';
import time from '../../assets/time.png';
import hero from '../../assets/hero.png';
import gift from '../../assets/gift.png';

const DemoCarousel = () => {
  return (
    <div className={styles.carousel}>
      <Carousel
        showArrows={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showStatus={false}
        transitionEffect="fade"
        showIndicators={false}
      >
        <div>
          <img src={time} alt="Image 1" />
        </div>
        <div>
          <img src={hero} alt="Image 2" />
        </div>
        <div>
          <img src={gift} alt="Image 3" />
        </div>
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
