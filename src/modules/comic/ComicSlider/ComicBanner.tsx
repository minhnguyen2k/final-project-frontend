import React, { FC } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PreviewDesc from './PreviewDesc';
import ComicSwiper from './ComicSwiper';

interface Props {
  comicList: any;
}

const ComicBanner: FC<Props> = ({ comicList }) => {
  const classes = useStyles();
  return <ComicSwiper comicList={comicList} />;
};

export default ComicBanner;

const useStyles = makeStyles((theme) => ({}));
