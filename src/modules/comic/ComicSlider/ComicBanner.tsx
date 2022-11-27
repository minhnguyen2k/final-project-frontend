import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import ComicSwiper from './ComicSwiper';
import { IComicInfo } from '../../../models/comic';

interface Props {
  comicList: IComicInfo[];
}

const ComicBanner: FC<Props> = ({ comicList }) => {
  const classes = useStyles();
  return <ComicSwiper comicList={comicList} />;
};

export default ComicBanner;

const useStyles = makeStyles((theme) => ({}));
