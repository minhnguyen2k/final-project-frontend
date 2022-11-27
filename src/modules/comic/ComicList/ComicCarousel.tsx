import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ComicCard from './ComicCard';
import 'swiper/css';
import { ChapTotal, IComicInfo } from '../../../models/comic';
interface Props {
  data: IComicInfo[];
  title: string;
  chapTotal?: ChapTotal[];
  sortType: string;
}

const ComicCarousel: FC<Props> = ({ data, title, sortType, chapTotal }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.titleSection}>
        <Typography variant="h4">{title}</Typography>
      </div>
      <Swiper id="swiper" slidesPerView={sortType !== 'vote' ? 7 : 4} className={classes.swiper} spaceBetween={24}>
        {data.map((item: IComicInfo) => (
          <SwiperSlide key={item.id} style={{ width: sortType !== 'vote' ? '152px' : '260px' }}>
            <ComicCard chapTotal={chapTotal} comic={item} sortType={sortType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ComicCarousel;

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
  titleSection: {
    zIndex: 0,
    marginBottom: '24px',
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllPath: {
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '14px',
  },
  loading: {
    height: `calc(336px - ${theme.spacing(16)}px)`,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      height: `calc(336px - ${theme.spacing(14)}px)`,
    },
  },
}));
