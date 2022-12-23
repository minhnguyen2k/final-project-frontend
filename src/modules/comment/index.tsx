import React, { FC, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../../redux/reducer';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { fetchThunk } from '../comic/common/redux/thunk';
import { API_PATHS } from '../../configs/api';
import { setCommentListInfo } from '../comic/common/redux/comicReducer';
import Loader from '../../components/Loader';
import { Typography } from '@mui/material';

interface Props {}

const Comment: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [checkCommentList, setCheckCommentList] = useState<number[]>([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const currentUser = useSelector((state: AppState) => state.profile.user);
  const comic = useSelector((state: AppState) => state.comicReader.comicInfo);
  const commentList = useSelector((state: AppState) => state.comic.commentList);
  const handleCreateComment = useCallback(
    async (commentContent) => {
      setIsLoading(true);
      const commentObj = { bookId: comic?.id, content: commentContent };
      const json = await dispatch(fetchThunk(API_PATHS.createComment, 'post', commentObj));
      if (json.success) {
        setCheckCommentList([]);
        getAllCommentByBook();
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [comic?.id, dispatch],
  );
  const getAllCommentByBook = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.getAllCommentByBook}/${comic?.id}`, 'get'));
    if (json.success) {
      if (json.data.length === 0) setCheckCommentList([1]);
      dispatch(setCommentListInfo([...json.data]));
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [comic?.id, dispatch]);
  useEffect(() => {
    if (commentList.length > 0) {
      if (commentList[0].bookId === comic?.id) return;
    }
    getAllCommentByBook();
  }, [getAllCommentByBook]);
  return (
    <div className={classes.root}>
      {isLoading && <Loader />}
      <Typography variant="h4">{`Bình luận ( ${commentList.length} )`}</Typography>
      {currentUser ? (
        <CommentForm handleCreateComment={handleCreateComment} />
      ) : (
        <Typography textAlign="center" my={2}>
          Bạn cần phải đăng nhập để bình luận
        </Typography>
      )}
      <CommentList checkCommentList={checkCommentList} commentList={commentList} />
    </div>
  );
};

export default Comment;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  borderComment: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    left: '14px',
    right: '14px',
    borderRadius: '0px',
  },
}));
