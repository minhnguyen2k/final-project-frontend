import React, { FC, useEffect, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router';

interface Props {
  handleCreateComment(commentContent: string): void;
}

const CommentForm: FC<Props> = ({ handleCreateComment }) => {
  const classes = useStyles();
  const location = useLocation();
  const [commentContent, setCommentContent] = useState('');
  useEffect(() => {
    setCommentContent('');
  }, [location.pathname]);
  return (
    <div>
      <Box display="flex" mb={1} margin="30px 0px" gap={1} height="auto">
        <Avatar sx={{ width: 50, height: 50 }} />
        <Box display="flex" flexDirection="column" gap={2} flex={1}>
          <TextField
            size="small"
            value={commentContent}
            fullWidth
            placeholder="Bình luận gì đó !"
            variant="outlined"
            onChange={(e) => setCommentContent(e.target.value)}
            InputProps={{
              classes: { notchedOutline: classes.borderComment },
            }}
          />
          <Box alignSelf="flex-end" px="14px">
            <Button
              onClick={() => {
                if (commentContent) {
                  setCommentContent('');
                  handleCreateComment(commentContent);
                }
              }}
              endIcon={<SendIcon />}
              size="small"
              variant="contained"
            >
              Bình luận
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CommentForm;

const useStyles = makeStyles((theme) => ({
  borderComment: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    left: '14px',
    right: '14px',
    borderRadius: '0px',
  },
}));
