import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Chip, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
interface Props {
  comic: any;
}

const PreviewDesc: FC<Props> = ({ comic }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box height="60px" mt={1}>
        <Typography variant="h4">{comic && comic.title}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography sx={{ marginRight: '10px' }}>Tác giả:</Typography>
        <Swiper id="swiper" slidesPerView="auto" spaceBetween={8} className={classes.tagWrapper}>
          <SwiperSlide>
            <Chip
              sx={{
                bgcolor: '#ff8a80',
                '&:hover': {
                  backgroundColor: '#ef9a9a',
                },
              }}
              label={comic && comic.detail.author}
              component="a"
              href="#basic-chip"
              clickable
            />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box display="flex" mt={2}>
        <Typography sx={{ marginRight: '5px' }}>Lượt xem</Typography>
        <VisibilityIcon />
        {':'}
        <Typography sx={{ marginLeft: '10px' }}>48</Typography>
      </Box>
      <Box display="flex" mt={2}>
        <Typography sx={{ marginRight: '5px' }}>Lượt vote</Typography>
        <FavoriteIcon />
        {':'}
        <Typography sx={{ marginLeft: '10px' }}>48</Typography>
      </Box>
      <Button size="small" className={classes.readingButton} variant="contained" disableElevation>
        Read Now
      </Button>
    </div>
  );
};

export default PreviewDesc;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '328px',
    padding: '0 12px',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tagWrapper: {
    width: '100%',
    flex: 1,
  },
  readingButton: {
    marginTop: '16px',
    backgroundColor: '#ff8a80',
    color: 'black',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ef9a9a',
    },
  },
}));
