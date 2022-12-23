import React, { FC, useState, useCallback, useEffect } from 'react';
import ReadImage from '../ComicReader/ReadImage';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useParams } from 'react-router-dom';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { IChapImageInfo } from '../../../models/chap-image';
import ComicLayout from '../../../layout/ComicLayout';
import { AppState } from '../../../redux/reducer';
import { useSelector } from 'react-redux';
import ComicNavbarReader from '../ComicReader/ComicNavbarReader';
import Loader from '../../../components/Loader';

interface Props {}

const ReadPage: FC<Props> = () => {
  const [chapImageList, setChapImageList] = useState<IChapImageInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const comic = useSelector((state: AppState) => state.comicReader.comicInfo);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getAllChapImages = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.allChapImage}/${id}`, 'get'));
    setChapImageList([...json.data]);
    setIsLoading(false);
  }, [dispatch, id]);
  const handleUpdateComicViewCount = useCallback(async () => {
    if (comic) {
      const { id, ...data } = comic;
      await dispatch(
        fetchThunk(`${API_PATHS.updateBook}/${comic.id}`, 'put', { ...data, viewCount: data.viewCount + 1 }),
      );
    }
  }, [comic, dispatch]);
  useEffect(() => {
    handleUpdateComicViewCount();
    getAllChapImages();
  }, [getAllChapImages]);
  return (
    <>
      {isLoading && <Loader />}
      {comic && <ComicNavbarReader key={id} comic={comic} />}
      {chapImageList && !isLoading && comic && <ReadImage comic={comic} chapImageList={chapImageList} />}
    </>
  );
};

export default ReadPage;
