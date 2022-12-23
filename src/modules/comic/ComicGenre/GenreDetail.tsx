import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, Pagination, Stack } from '@mui/material';
import ComicCard from '../ComicList/ComicCard';
import { IComicInfo } from '../../../models/comic';
import { IGenreInfo } from '../../../models/genre';
import { useSearchParams } from 'react-router-dom';
interface Props {
  comicList?: IComicInfo[];
  genre?: IGenreInfo;
  totalPage?: number;
  handleChangePage(page: number): void;
}

const GenreDetail: FC<Props> = ({ comicList, genre, handleChangePage, totalPage }) => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  return (
    <div className={classes.genreDetailWrapper}>
      {genre ? (
        <div className={classes.genreDescription}>
          <Typography textAlign="center" variant="h4">
            Truyện thể loại&nbsp;<strong>{genre.name}</strong>
          </Typography>
          <Typography border="1px solid #dedede" borderRadius="25px" p={2} my={2}>
            {genre.description}
          </Typography>
        </div>
      ) : (
        <div className={classes.genreDescription}>
          <Typography textAlign="center" variant="h4">
            Tất cả thể loại
          </Typography>
          <Typography border="1px solid #dedede" borderRadius="25px" p={2} my={2}>
            Tổng hợp tất cả thể loại truyện tranh
          </Typography>
        </div>
      )}

      <Box display="flex" paddingLeft="7px" flexWrap="wrap">
        {genre
          ? genre.Books?.map((comic: IComicInfo) => {
              return (
                <Box key={comic.id} padding="0px 7px">
                  <ComicCard comic={comic} width="150px" height="200px" sortType="popular" />
                </Box>
              );
            })
          : comicList
          ? comicList.map((comic: IComicInfo) => {
              return (
                <Box key={comic.id} padding="0px 7px">
                  <ComicCard comic={comic} width="150px" height="200px" sortType="popular" />
                </Box>
              );
            })
          : null}
      </Box>
      <Stack
        sx={{
          margin: '15px 0px',
        }}
        spacing={2}
      >
        <Pagination
          page={+searchParams.get('page')! || 1}
          sx={{ display: 'flex', justifyContent: 'center' }}
          onChange={(e, page) => {
            handleChangePage(page);
          }}
          count={totalPage}
        />
      </Stack>
    </div>
  );
};

export default GenreDetail;

const useStyles = makeStyles((theme) => ({
  genreDetailWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    width: '73%',
  },
  genreDescription: { paddingLeft: '7px', paddingRight: '7px' },
  imageCard: {
    height: '320px',
    width: '240px',
    objectFit: 'cover',
    marginRight: theme.spacing(3),
  },
}));
