import React, { FC, useEffect, useRef, useState } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Fab from '@mui/material/Fab';
import cn from 'classnames';
import SwiperCore, { Autoplay, Controller, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { makeStyles } from '@mui/styles';
import { NavigationOptions } from 'swiper/types';
import 'swiper/css';
import './style.scss';
import PreviewDesc from './PreviewDesc';
import { IComicInfo } from '../../../models/comic';

interface Props {
  comicList: IComicInfo[];
}

SwiperCore.use([Navigation, Autoplay, Controller]);
const SLIDE_WIDTH = 136;
const slideSpeed = 4000;

const ComicSwiper: FC<Props> = ({ comicList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore>();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const changeSlide = (index: number) => {
    controlledSwiper?.slideTo(index);
    setActiveIndex(index);
  };
  const getComicPreviewImage = (comic: IComicInfo) => {
    return comic?.image;
  };
  const backgroundImageUrl = getComicPreviewImage(comicList[activeIndex]);
  const classes = useStyles();
  useEffect(() => {
    if (controlledSwiper) {
      const autoPlay = setInterval(() => {
        if (activeIndex === comicList.length - 1) {
          controlledSwiper.slideTo(0);
          setActiveIndex(0);
        } else {
          controlledSwiper.slideTo(activeIndex + 1);
          setActiveIndex((prev) => prev + 1);
        }
      }, slideSpeed);

      return () => {
        clearInterval(autoPlay);
      };
    }
  }, [activeIndex, controlledSwiper]);
  return (
    <div className={classes.root}>
      <div
        style={{
          transition: 'all 300ms',
          backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.64) 0%, rgb(255 255 255) 100%), url(${backgroundImageUrl})`,
        }}
        className={classes.bgImage}
      />
      <div className={classes.bannerWrapper}>
        <PreviewDesc comic={comicList[activeIndex]} />
        <div className={classes.swiperWrap}>
          <Swiper
            className={classes.swiper}
            controller={{ control: controlledSwiper }}
            onSwiper={setControlledSwiper}
            slidesPerView={5}
            spaceBetween={16}
            direction="horizontal"
            slideToClickedSlide
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper: SwiperCore) => {
              (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
              (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
            }}
          >
            <Fab
              size="small"
              className={cn(classes.navNext, classes.nav, {
                [classes.hidden]: activeIndex === comicList.length - 1,
              })}
              ref={navigationNextRef}
              color="secondary"
              onClick={() => changeSlide(activeIndex + 1)}
            >
              <ChevronRight fontSize="medium" />
            </Fab>
            <Fab
              size="small"
              className={cn(classes.navPrev, classes.nav, { [classes.hidden]: activeIndex === 0 })}
              ref={navigationPrevRef}
              color="secondary"
              onClick={() => changeSlide(activeIndex - 1)}
            >
              <ChevronLeft fontSize="medium" />
            </Fab>
            {comicList.map((comic: IComicInfo, index: number) => (
              <SwiperSlide onClick={() => changeSlide(index)} style={{ width: '136px' }} key={comic.id}>
                <img
                  className={cn(classes.imageCard, { [classes.activeSlide]: index == activeIndex })}
                  src={comic.image}
                  alt={comic.name}
                />
              </SwiperSlide>
            ))}
            <div className={classes.pagination}>
              {comicList.map((comic: IComicInfo, index: number) => {
                return (
                  <span
                    key={comic.id}
                    onClick={() => changeSlide(index)}
                    className={cn(classes.paginationBullet, {
                      [classes.paginationActive]: index === activeIndex,
                    })}
                  />
                );
              })}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ComicSwiper;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '128px ',
    paddingBottom: '68px',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      alignItems: 'unset',
    },
  },
  bgImage: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  bannerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  swiperWrap: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'end',
    padding: '0 12px',
    minWidth: 0,
    width: '100%',
  },
  swiper: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  imageCard: {
    height: '192px',
    width: `${SLIDE_WIDTH}px`,
    borderRadius: '8px',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  activeSlide: {
    transition: 'all 100ms',
    border: `4px solid ${theme.palette.secondary.main}`,
    boxSizing: 'border-box',
  },
  nav: {
    position: 'absolute',
    display: 'flex',
    zIndex: 10,
    cursor: 'pointer',
    top: '35%',
  },
  navNext: {
    right: '8px',
  },
  navPrev: {
    left: '8px',
  },
  hidden: {
    display: 'none',
  },
  pagination: {
    marginInline: 'auto',
    marginTop: '14px',
  },
  paginationBullet: {
    width: '8px',
    height: '8px',
    display: 'inline-block',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[800],
    marginRight: '12px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '8px',
    },
    cursor: 'pointer',
  },
  paginationActive: {
    background: '#fb8c00 ',
    opacity: '1',
  },
}));
