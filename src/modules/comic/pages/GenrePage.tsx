import React, { FC, useState, useCallback, useEffect } from 'react';
import ComicLayout from '../../../layout/ComicLayout';
import { Box, Pagination, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import GenreDetail from '../ComicGenre/GenreDetail';
import GenreList from '../ComicGenre/GenreList';
import { IComicInfo } from '../../../models/comic';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { IGenreInfo } from '../../../models/genre';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppState } from '../../../redux/reducer';
import Loader from '../../../components/Loader';
import { setGenreListInfo } from '../common/redux/comicReducer';

interface Props {}

const GenrePage: FC<Props> = () => {
  const [comicList, setComicList] = useState<IComicInfo[]>([]);
  const [genreList, setGenreList] = useState<IGenreInfo[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [genre, setGenre] = useState<IGenreInfo>();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('page'));
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const classes = useStyles();
  const handleChangePage = (page: number) => {
    const pageObj = { page: page.toString() };
    navigate({
      search: createSearchParams(pageObj).toString(),
    });
  };
  const getAllComic = useCallback(async () => {
    const page = searchParams.get('page') || 1;
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.allBooks}?page=${page}`, 'get'));
    setIsLoading(false);
    setTotalPage(json.totalPage);
    setComicList([...json.data]);
  }, [dispatch, searchParams]);

  const getAllGenres = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.allGenres, 'get'));
    setIsLoading(false);
    setGenreList([...json.data]);
    dispatch(setGenreListInfo([...json.data]));
  }, [dispatch]);

  const getGenreById = useCallback(async () => {
    const page = searchParams.get('page') || 1;
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.genreById}/${id}?page=${page}`, 'get'));
    setIsLoading(false);
    setTotalPage(json.totalPage);
    setGenre({ ...json.data[0] });
  }, [dispatch, id, searchParams]);

  useEffect(() => {
    if (!id) {
      getAllComic();
      setGenre(undefined);
    } else getGenreById();
    getAllGenres();
  }, [getAllGenres, getAllComic, id, getGenreById, searchParams]);
  return (
    <>
      <ComicLayout background="background.neutral" isReadScreen={false}>
        {isLoading && <Loader />}
        <div className={classes.root}>
          <Box display="flex" mt={3} alignItems="flex-start" justifyContent="space-between" gap={2}>
            {!genre ? (
              <GenreDetail totalPage={totalPage} handleChangePage={handleChangePage} comicList={comicList} />
            ) : (
              <GenreDetail totalPage={totalPage} handleChangePage={handleChangePage} genre={genre} />
            )}
            <GenreList genreList={genreList} />
          </Box>
        </div>
      </ComicLayout>
    </>
  );
};

export default GenrePage;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1200px',
    margin: '0 auto',
    paddingTop: '88px ',
    paddingBottom: '28px',
    position: 'relative',
  },
}));
