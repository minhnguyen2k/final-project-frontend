import React, { FC, useCallback, useEffect, useState } from 'react';
import ComicLayout from '../../../layout/ComicLayout';
import { makeStyles } from '@mui/styles';
import ComicFilteredResult from '../ComicFiltered/components/ComicFilteredResult';
import FilterBar from '../ComicFiltered/components/FilterBar';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { setGenreListInfo } from '../common/redux/comicReducer';
import { IComicInfo, IFilterComic } from '../../../models/comic';
import { Box } from '@mui/material';
import Loader from '../../../components/Loader';
interface Props {}

const ComicFilteredPage: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const genreList = useSelector((state: AppState) => state.comic.genreList);
  const [comicListFiltered, setComicListFiltered] = useState<IComicInfo[]>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getAllGenres = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allGenres, 'get'));
    dispatch(setGenreListInfo(json.data));
  }, [dispatch]);
  const getComicsByFilter = useCallback(
    async (filterFormData: IFilterComic = { genreId: '', sortBy: 'newChapter', chapCount: 0 }) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.filterBook, 'post', filterFormData));
      if (json.success) {
        setIsLoading(false);
        setComicListFiltered([...json.data]);
      }
    },
    [dispatch],
  );
  useEffect(() => {
    if (genreList.length === 0) {
      getAllGenres();
    }
    if (comicListFiltered.length === 0) getComicsByFilter();
  }, [getAllGenres, getComicsByFilter]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      {isLoading && <Loader />}
      <div className={classes.root}>
        <Box mt={1} className={classes.comicFilteredPageWrapper}>
          <FilterBar getComicsByFilter={getComicsByFilter} genreList={genreList} />
          <ComicFilteredResult comicListFiltered={comicListFiltered} />
        </Box>
      </div>
    </ComicLayout>
  );
};

export default ComicFilteredPage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1200px',
    margin: '0 auto',
    paddingTop: '88px ',
    paddingBottom: '28px',
    position: 'relative',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  comicFilteredPageWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));
