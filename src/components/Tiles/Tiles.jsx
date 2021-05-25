import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import {Link} from 'react-router-dom';
import { sha256, sha224 } from "js-sha256";
import 'swiper/swiper-bundle.css';

import styles from './Tiles.module.css';
import { keys } from '@material-ui/core/styles/createBreakpoints';

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

    {Object.keys(favorites).map((key, i) => {
        function linker(key){
          if(key){
            return '/profile/'+sha256(key);
          }
        }

        return (
          <SwiperSlide style={{padding: '1rem'}} key={i} className="d-flex align-items-center justify-content-center">
            <Link to={linker(key)} replace>
              <div className={styles.card} style={{backgroundImage: `url('${favorites[key]}')`}}>
              
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