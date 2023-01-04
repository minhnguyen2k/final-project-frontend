import React, { FC, useState, useCallback, useEffect } from 'react';
import ComicLayout from '../../../layout/ComicLayout';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ComicInfo from '../ComicDetail/Components/ComicInfo';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useLocation, useParams } from 'react-router-dom';
import ComicInfoNavigation from '../ComicDetail/Components/ComicInfoNavigation';
import RelationComic from '../ComicDetail/Components/RelationComic';
import { fetchThunk } from '../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { IComicInfo } from '../../../models/comic';
import { TotalRelevantBooksChap } from '../../../models/chap';
import { setComicInfoAction } from '../ComicReader/redux/comicReaderReducer';
import { AppState } from '../../../redux/reducer';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';

interface Props {}

const ComicDetailPage: FC<Props> = () => {
  const [comic, setComic] = useState<IComicInfo>();
  const currentUser = useSelector((state: AppState) => state.profile.user);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
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
  const handleCheckBookIsFavorited = useCallback(async () => {
    const favoriteObj = { bookId: id };
    const json = await dispatch(fetchThunk(API_PATHS.checkCurrentBookFavorited, 'post', favoriteObj));
    if (json.success) {
      setIsFavorited(true);
    }
  }, [dispatch, id]);

  const handleUpdateComicVoteCount = useCallback(async () => {
    if (comic) {
      const { id, ...data } = comic;
      const json = await dispatch(
        fetchThunk(`${API_PATHS.updateBook}/${comic.id}`, 'put', {
          ...data,
          voteCount: isFavorited ? data.voteCount - 1 : data.voteCount + 1,
        }),
      );
      if (json.success) {
        setComic({ ...comic, voteCount: json.data.voteCount });
      }
    }
  }, [comic, dispatch, isFavorited]);

  const handleCreateFavorite = useCallback(async () => {
    if (!currentUser) {
      toast.info('Bạn cần đăng nhập để có thể thực hiện chức năng yêu thích', { containerId: 'B' });
      return;
    }
    const favoriteObj = { bookId: comic?.id };
    const json = await dispatch(fetchThunk(API_PATHS.createFavorite, 'post', favoriteObj));
    if (json.success) {
      handleUpdateComicVoteCount();
      setIsFavorited(true);
      toast.success('Đã thêm truyện vào mục yêu thích', { containerId: 'A' });
    }
  }, [comic?.id, dispatch, handleUpdateComicVoteCount]);

  const handleDeleteFavorite = useCallback(async () => {
    const favoriteObj = { bookId: comic?.id };
    const json = await dispatch(fetchThunk(API_PATHS.deleteFavorite, 'delete', favoriteObj));
    if (json.success) {
      handleUpdateComicVoteCount();
      setIsFavorited(false);
      toast.success('Đã bỏ thích truyện', { containerId: 'A' });
    }
  }, [comic?.id, dispatch, handleUpdateComicVoteCount]);

  useEffect(() => {
    setIsFavorited(false);
  }, [location.pathname]);

  useEffect(() => {
    getComicById();
    if (currentUser) {
      handleCheckBookIsFavorited();
    }
  }, [currentUser, getComicById, handleCheckBookIsFavorited]);
  return (
    <ComicLayout background="background.neutral" isReadScreen={false}>
      <div className={classes.root}>
        {isLoading && <Loader />}
        {comic && !isLoading && (
          <ComicInfo
            comic={comic}
            handleCreateFavorite={handleCreateFavorite}
            handleDeleteFavorite={handleDeleteFavorite}
            isFavorited={isFavorited}
          />
        )}
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
