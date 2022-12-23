import React, { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { ICommentInfo } from '../../models/comment';
import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
interface Props {
  comment: ICommentInfo;
}

const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <div>
      <Box display="flex" mb={1} margin="30px 0px" gap={3} height="auto" alignItems="center">
        <Avatar sx={{ width: 50, height: 50 }} />
        <Box>
          <Box display="flex" gap={3}>
            <Typography fontWeight="bold" mb={2} whiteSpace="nowrap">
              {comment.User?.username}
            </Typography>
            <Typography mb={2} whiteSpace="nowrap">
              {formatDistanceToNow(new Date(comment.createdAt!), { locale: vi, addSuffix: true })}
            </Typography>
          </Box>
          <Typography whiteSpace="nowrap">{comment.content}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CommentItem;
