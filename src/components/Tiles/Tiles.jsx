import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {Link} from 'react-router-dom';
import { sha256, sha224 } from "js-sha256";
import 'swiper/swiper-bundle.css';

import styles from './Tiles.module.css';

SwiperCore.use([Navigation]);



const Tiles = ({ slidesPerView, favorites }) => (
    
  <Swiper
    spaceBetween={1}
    slidesPerView={slidesPerView}
    slidesPerGroup={slidesPerView}
    breakpoints={{
      1080: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    }}
    className={styles.tiles}
    navigation
    direction="horizontal"
  >

    {favorites && favorites.map((object) => {
        function linker(object){
          if(object.email){
            return '/profile/'+sha256(object.email);
          }
        }

        return (
          <SwiperSlide style={{padding: '1rem'}} key={object.id} className="d-flex align-items-center justify-content-center">
            <Link to={linker(object)} replace>
              <div className={styles.card} style={{backgroundImage: `url('${object.imgUrl}')`}}>
              </div>
              {/* <a>
                  <img src={object.imgUrl} className={classes.images}/>
              </a> */}
            </Link>
          </SwiperSlide>
        );
      })}
    
  </Swiper>
);

Tiles.propTypes = {
  slidesPerView: PropTypes.number,
};

export default Tiles;