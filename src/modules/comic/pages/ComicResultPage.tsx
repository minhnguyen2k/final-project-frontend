import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IComicInfo } from '../../../models/comic';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useSearchParams } from 'react-router-dom';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import Loader from '../../../components/Loader';
import ComicLayout from '../../../layout/ComicLayout';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import ComicFilteredResult from '../ComicFiltered/components/ComicFilteredResult';

interface Props {}

const ComicResultPage: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [comicListFiltered, setComicListFiltered] = useState<IComicInfo[]>([]);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getComicsByFilter = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.searchBook}?name=${searchParams.get('name')}`, 'get'));
    if (json.success) {
      setIsLoading(false);
      setComicListFiltered([...json.data]);
    }
  }, [dispatch, searchParams]);
  useEffect(() => {
    getComicsByFilter();
  }, [getComicsByFilter]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      {isLoading && <Loader />}
      <div className={classes.root}>
        <Box mt={1} className={classes.comicFilteredPageWrapper}>
          <Typography mb={5} pl={5} variant="h3">{`${comicListFiltered.length} kết quả tìm kiếm cho "${searchParams.get(
            'name',
          )}"`}</Typography>
          <ComicFilteredResult comicListFiltered={comicListFiltered} />
        </Box>
      </div>
    </ComicLayout>
  );
};

export default ComicResultPage;

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
