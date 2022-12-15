import React, { FC, useState, useCallback, useEffect } from 'react';
import ComicLayout from '../../../layout/ComicLayout';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ComicInfo from '../ComicDetail/Components/ComicInfo';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useParams } from 'react-router-dom';
import ComicInfoNavigation from '../ComicDetail/Components/ComicInfoNavigation';
import RelationComic from '../ComicDetail/Components/RelationComic';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { IComicInfo } from '../../../models/comic';
import { TotalRelevantBooksChap } from '../../../models/chap';
import { setComicInfoAction } from '../ComicReader/redux/comicReaderReducer';
import { AppState } from '../../../redux/reducer';
import Loader from '../../../components/Loader';

interface Props {}

const ComicDetailPage: FC<Props> = () => {
  const [comic, setComic] = useState<IComicInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [relationComics, setRelationComics] = useState<IComicInfo[]>([]);
  const [totalRelevantBooksChap, setTotalRelevantBooksChap] = useState<TotalRelevantBooksChap[]>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const classes = useStyles();
  const { id } = useParams();
  const getComicById = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.bookById}/${id}`, 'get'));
    setComic({ ...json.data.book });
    setRelationComics([...json.data.relevantBooks]);
    setTotalRelevantBooksChap([...json.data.totalRelevantBooksChap]);
    dispatch(setComicInfoAction({ ...json.data.book }));
    setIsLoading(false);
  }, [dispatch, id]);
  useEffect(() => {
    getComicById();
  }, [getComicById]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      <div className={classes.root}>
        {isLoading && <Loader />}
        {comic && !isLoading && <ComicInfo comic={comic} />}
        <Box display="flex" mt={3} alignItems="flex-start" gap={2}>
          {comic && comic.Chaps && <ComicInfoNavigation bookName={comic.name} chapList={comic.Chaps} />}
          <RelationComic totalRelevantBooksChap={totalRelevantBooksChap} relationComics={relationComics} />
        </Box>
      </div>
    </ComicLayout>
  );
};

export default ComicDetailPage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1200px',
    margin: '0 auto',
    paddingTop: '88px ',
    paddingBottom: '28px',
    position: 'relative',
  },
}));
