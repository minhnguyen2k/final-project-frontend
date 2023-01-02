import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Chip, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IComicInfo } from '../../../models/comic';
import { IAuthorInfo } from '../../../models/author';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';
import { generateReadComicLink, sortObj } from '../../../utils/generalHelpers';
import { IChapInfo } from '../../../models/chap';
import { setComicInfoAction } from '../ComicReader/redux/comicReaderReducer';
import { AppState } from '../../../redux/reducer';
interface Props {
  comic: IComicInfo;
}

const PreviewDesc: FC<Props> = ({ comic }) => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  return (
    <div className={classes.root}>
      <Box height="100px">
        <Typography className={classes.title} variant="h4">
          {comic?.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography mr="10px">Tác giả:</Typography>
        <Swiper id="swiper" className={classes.swiper} slidesPerView="auto" spaceBetween={8}>
          {comic?.Authors?.map((author: IAuthorInfo) => (
            <SwiperSlide key={author.id}>
              <Chip
                sx={{
                  bgcolor: '#ff8a80',
                  '&:hover': {
                    backgroundColor: '#ef9a9a',
                  },
                }}
                label={author.name}
                onClick={() => navigate(`/comic/author/${author.id}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box display="flex" mt={1}>
        <Typography mr={1}>Lượt xem</Typography>
        <VisibilityIcon />
        {':'}
        <Typography ml="10px">{comic?.viewCount}</Typography>
      </Box>
      <Box display="flex" mt={2}>
        <Typography mr={1}>Lượt thích</Typography>
        <FavoriteIcon />
        {':'}
        <Typography ml="10px">{comic?.voteCount}</Typography>
      </Box>
      <Button
        size="small"
        onClick={() => {
          if (comic && comic.Chaps) {
            const comicChapList: IChapInfo[] = sortObj(comic.Chaps, 'chapName', true).reverse();
            dispatch(setComicInfoAction({ ...comic }));
            navigate(
              generateReadComicLink(
                comic.name,
                comicChapList[comicChapList.length - 1].chapName,
                comicChapList[comicChapList.length - 1].id!,
              ),
            );
          }
        }}
        className={classes.readingButton}
        variant="contained"
        disableElevation
      >
        Đọc ngay
      </Button>
    </div>
  );
};

export default PreviewDesc;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '328px',
    padding: '0 12px',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    maxWidth: '100%',
    maxHeight: '72px',
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    'line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  },
  readingButton: {
    marginTop: '16px',
    backgroundColor: '#ff8a80',
    color: 'black',
    fontSize: '18px',
    '&:hover': {
      backgroundColor: '#ef9a9a',
    },
  },
  swiper: {
    flex: 1,
  },
}));
