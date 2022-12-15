import React, { FC, useCallback, useEffect, useState } from 'react';
import ComicCarousel from './ComicCarousel';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { ChapTotal, IComicInfo } from '../../../models/comic';
import { AppState } from '../../../redux/reducer';
import Loader from '../../../components/Loader';

interface Props {}

const ComicList: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [newReleaseBooks, setNewReleaseBooks] = useState<IComicInfo[]>([]);
  const [newReleaseBooksChapter, setNewReleaseBooksChapter] = useState<IComicInfo[]>([]);
  const [topBooks, setTopBooks] = useState<IComicInfo[]>([]);
  const [actionBooks, setActionBooks] = useState<IComicInfo[]>([]);
  const [chapTotal, setChapTotal] = useState<ChapTotal[]>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getNewReleaseBooks = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.newReleaseBook, 'get'));
    setNewReleaseBooks([...json.data]);
  }, [dispatch]);
  const getNewReleaseBooksChapter = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.newReleaseBookChapter, 'get'));
    const books = json.data.map((item: any) => {
      const { Book, ...Chap } = item;
      return { ...Book, Chaps: [Chap] };
    });
    setNewReleaseBooksChapter(books);
  }, [dispatch]);
  const getTopBooks = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.topBook, 'get'));
    setTopBooks([...json.data.books]);
    setChapTotal([...json.data.chapTotal]);
  }, [dispatch]);
  const getActionBooks = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.actionBook, 'get'));
    setActionBooks([...json.data]);
  }, [dispatch]);
  useEffect(() => {
    setIsLoading(true);
    getNewReleaseBooks();
    getNewReleaseBooksChapter();
    getTopBooks();
    getActionBooks();
    setIsLoading(false);
  }, [getActionBooks, getNewReleaseBooks, getNewReleaseBooksChapter, getTopBooks]);
  return (
    <div className={classes.root}>
      {isLoading && <Loader />}
      <ComicCarousel data={newReleaseBooks} title="Truyện mới cập nhật" sortType="popular" />
      <ComicCarousel data={newReleaseBooksChapter} title="Chapter mới cập nhật" sortType="newChapter" />
      <ComicCarousel data={topBooks} chapTotal={chapTotal} title="Truyện nhiều người ưa thích" sortType="vote" />
      <ComicCarousel data={actionBooks} title="Truyện hành động" sortType="popular" />
      {/* {comicList && <ComicCarousel data={comicList} title="Truyện phiêu lưu" sortType="popular" />}
      {comicList && <ComicCarousel data={comicList} title="Truyện ngôn tình" sortType="popular" />} */}
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
