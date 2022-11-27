import React, { FC, useState, useCallback, useEffect } from 'react';
import ComicLayout from '../../../layout/ComicLayout';
import { Box } from '@mui/material';
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
import { useParams } from 'react-router-dom';
import { AppState } from '../../../redux/reducer';

interface Props {}

const GenrePage: FC<Props> = () => {
  const [comicList, setComicList] = useState<IComicInfo[]>([]);
  const [genreList, setGenreList] = useState<IGenreInfo[]>([]);
  const [genre, setGenre] = useState<IGenreInfo>();
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const classes = useStyles();
  const getAllComic = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allBooks, 'get'));
    setComicList([...json.data]);
  }, [dispatch]);
  const getAllGenres = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allGenres, 'get'));
    setGenreList([...json.data]);
  }, [dispatch]);
  const getGenreById = useCallback(async () => {
    const json = await dispatch(fetchThunk(`${API_PATHS.genreById}/${id}`, 'get'));
    setGenre({ ...json.data[0] });
  }, [dispatch, id]);
  useEffect(() => {
    if (!id) {
      getAllComic();
      setGenre(undefined);
    } else getGenreById();
    getAllGenres();
  }, [getAllGenres, getAllComic, id, getGenreById]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      <div className={classes.root}>
        <Box display="flex" mt={3} alignItems="flex-start" justifyContent="space-between" gap={2}>
          {!genre ? <GenreDetail comicList={comicList} /> : <GenreDetail genre={genre} />}
          <GenreList genreList={genreList} />
        </Box>
      </div>
    </ComicLayout>
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
