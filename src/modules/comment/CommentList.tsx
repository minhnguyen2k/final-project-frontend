import React, { FC } from 'react';
import { ICommentInfo } from '../../models/comment';
import CommentItem from './CommentItem';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import { Box, Typography } from '@mui/material';

interface Props {
  commentList: ICommentInfo[];
  checkCommentList: number[];
}

const CommentList: FC<Props> = ({ commentList, checkCommentList }) => {
  return (
    <div>
      {checkCommentList.length > 0 && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
          <ChatTwoToneIcon sx={{ fontSize: '100px' }} />
          <Typography variant="h5" color="#889096">
            Chưa có bình luận nào
          </Typography>
          <Typography fontSize="20px">Hãy là người đầu tiên bình luận</Typography>
        </Box>
      )}
      {commentList.map((comment) => {
        return (
          <Box display="flex" flexDirection="column" key={comment.id}>
            <CommentItem comment={comment} />
          </Box>
        );
      })}
    </div>
  );
};

export default CommentList;
