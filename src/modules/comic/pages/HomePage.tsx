import React, { FC, useCallback, useState, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import ComicLayout from '../../../layout/ComicLayout';
import ComicList from '../ComicList';
import ComicBanner from '../ComicSlider/ComicBanner';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { IComicInfo } from '../../../models/comic';
import { AppState } from '../../../redux/reducer';
import Loader from '../../../components/Loader';

interface Props {}

const HomePage: FC<Props> = () => {
  const [comicList, setComicList] = useState<IComicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getComics = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.popularBook, 'get'));
    setComicList([...json.data]);
    setIsLoading(false);
  }, [dispatch]);
  useEffect(() => {
    getComics();
  }, [getComics]);

  return (
    <ComicLayout isReadScreen={false}>
      {isLoading && <Loader />}
      <ComicBanner comicList={comicList} />
      <ComicList />
    </ComicLayout>
  );
};

export default HomePage;
