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
import { Box, Pagination, Typography } from '@mui/material';
import Loader from '../../../components/Loader';
import ComicCard from '../ComicList/ComicCard';
import { IFavoriteInfo } from '../../../models/favorite';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
interface Props {}

const ComicFavoritedPage: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(1);

  const handleChangePage = (page: number) => {
    const pageObj = { page: page.toString() };
    navigate({
      search: createSearchParams(pageObj).toString(),
    });
  };

  const currentUser = useSelector((state: AppState) => state.profile.user);
  const [favoriteList, setFavoriteList] = useState<IFavoriteInfo[]>([]);
  const getAllFavortieBooksByUser = useCallback(async () => {
    const page = searchParams.get('page') || 1;
    setIsLoading(true);
    const json = await dispatch(
      fetchThunk(`${API_PATHS.getAllFavoriteBooksByUser}/${currentUser?.id}?page=${page}`, 'get'),
    );
    if (json.success) {
      setIsLoading(false);
      setFavoriteList([...json.data]);
      setTotalPage(json.totalPage);
    }
  }, [currentUser?.id, dispatch, searchParams]);
  useEffect(() => {
    getAllFavortieBooksByUser();
  }, [getAllFavortieBooksByUser]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      {isLoading && <Loader />}
      <div className={classes.root}>
        <Box mt={1} className={classes.comicFavoritedPageWrapper}>
          <Typography variant="h3" ml={5} mt={1} mb={3}>
            Danh sách truyện đã thích
          </Typography>
          <Box display="flex" pl={5} mb={2} flexWrap="wrap" gap={4}>
            {favoriteList.map((favorite) => {
              return (
                <Box key={favorite.Book!.id}>
                  <ComicCard comic={favorite.Book!} width="150px" height="200px" sortType="popular" />
                </Box>
              );
            })}
          </Box>
          <Pagination
            page={+searchParams.get('page')! || 1}
            sx={{ display: 'flex', justifyContent: 'center' }}
            onChange={(e, page) => {
              handleChangePage(page);
            }}
            count={totalPage}
          />
        </Box>
      </div>
    </ComicLayout>
  );
};

export default ComicFavoritedPage;

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
  comicFavoritedPageWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));
