import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IComicInfo } from '../../../models/comic';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import Loader from '../../../components/Loader';
import ComicLayout from '../../../layout/ComicLayout';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import ComicCard from '../ComicList/ComicCard';

interface Props {}

const ComicAuthorListPage: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [comicList, setComicList] = useState<IComicInfo[]>([]);
  const { authorId } = useParams();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getAllBooksByAuthor = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.getAllBooksByAuthor}/${authorId}`, 'get'));
    if (json.success) {
      setIsLoading(false);
      setComicList([...json.data]);
    }
  }, [authorId, dispatch]);
  useEffect(() => {
    getAllBooksByAuthor();
  }, [getAllBooksByAuthor]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      {isLoading && <Loader />}
      <div className={classes.root}>
        <Box mt={1} className={classes.comicBookAuthorListPageWrapper}>
          {comicList.length > 0 && (
            <Typography my={3} pl={5} variant="h3">{`Danh sách truyện được sáng tác bởi "${
              comicList[0].Authors?.find((author) => author.id === authorId)?.name
            }"`}</Typography>
          )}
          <Box display="flex" pl={5} mb={2} flexWrap="wrap" gap={4}>
            {comicList.map((comic) => {
              return (
                <Box key={comic.id}>
                  <ComicCard comic={comic} width="150px" height="200px" sortType="popular" />
                </Box>
              );
            })}
          </Box>
        </Box>
      </div>
    </ComicLayout>
  );
};

export default ComicAuthorListPage;

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
  comicBookAuthorListPageWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));
