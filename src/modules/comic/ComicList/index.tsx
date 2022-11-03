import React, { FC } from 'react';
import ComicCarousel from './ComicCarousel';
import { makeStyles } from '@mui/styles';

interface Props {
  comicList: any;
}

const ComicList: FC<Props> = ({ comicList }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {comicList && <ComicCarousel data={comicList} title="Truyện mới cập nhật" sortType="popular" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện phổ biến" sortType="vote" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện nhiều người ưa thích" sortType="popular" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện hành động" sortType="popular" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện phiêu lưu" sortType="popular" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện ngôn tình" sortType="popular" />}
    </div>
  );
};

export default ComicList;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 4px',
    },
  },
}));
