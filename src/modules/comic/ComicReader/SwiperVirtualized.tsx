import React, { FC } from 'react';
import SwiperCore, { Virtual, Navigation, Pagination, Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@mui/styles';
import 'swiper/css';
import 'swiper/css/virtual';
interface Props {
  data: any;
  component?: any;
}

SwiperCore.use([Virtual, Navigation, Pagination, Scrollbar, Mousewheel]);
const SwiperVirtualized: FC<Props> = ({ data, component: Component }) => {
  const classes = useStyles();
  return (
    <>
      <Swiper
        //   modules={[Virtual]}
        id="swiper"
        direction="vertical"
        allowTouchMove={false}
        scrollbar={{ el: '.swiper-scrollbar', draggable: true, dragSize: 40 }}
        mousewheel
        className={classes.swiper}
        spaceBetween={0}
        slidesPerView={1}
        virtual={{
          addSlidesBefore: 10,
          addSlidesAfter: 10,
        }}
      >
        {data &&
          data.map((item: any, index: number) => {
            return (
              <SwiperSlide key={item.id} virtualIndex={index}>
                <img className={classes.imageComic} src={item.image} alt={`Page-${index}`} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default SwiperVirtualized;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1200px',
    padding: '16px 12px',
    width: '100%',
    zIndex: 1,
  },
  swiper: {
    width: '100%',
    height: '100vh',
    overflow: 'visible',
  },
  imageComic: {
    height: '100%',
    objectFit: 'cover',
  },
  loading: {
    height: `calc(336px - ${theme.spacing(16)}px)`,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: `calc(336px - ${theme.spacing(14)}px)`,
    },
  },
}));
