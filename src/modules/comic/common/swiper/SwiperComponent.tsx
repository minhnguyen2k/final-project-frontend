import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@mui/styles';
import 'swiper/css';
interface Props {
  data: any;
  component: any;
}

const SwiperComponent: FC<Props> = ({ data, component: Component }) => {
  const classes = useStyles();
  return (
    <Swiper id="swiper" slidesPerView="auto" className={classes.swiper} spaceBetween={8}>
      {data &&
        data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <Component data={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperComponent;

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
    '& .swiper-wrapper': {
      padding: '16px 0',
    },
  },
  loading: {
    height: `calc(336px - ${theme.spacing(16)}px)`,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: `calc(336px - ${theme.spacing(14)}px)`,
    },
  },
}));
