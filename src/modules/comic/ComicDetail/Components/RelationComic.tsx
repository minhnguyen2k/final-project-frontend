import React, { FC, useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box } from '@mui/material';
import { IComicInfo } from '../../../../models/comic';
import { TotalRelevantBooksChap } from '../../../../models/chap';
import { Link, useNavigate } from 'react-router-dom';
interface Props {
  relationComics: IComicInfo[];
  totalRelevantBooksChap: TotalRelevantBooksChap[];
}

const RelationComic: FC<Props> = ({ relationComics, totalRelevantBooksChap }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const findTotalChap = useCallback(
    (id: string) => {
      return totalRelevantBooksChap.find((item) => item.bookId === id)?.count;
    },
    [totalRelevantBooksChap],
  );
  return (
    <div className={classes.relateComicWrapper}>
      <Typography variant="h4">Related Comic</Typography>
      {relationComics.map((comic: IComicInfo) => {
        return (
          <Link style={{ textDecoration: 'none', color: 'unset' }} to={`/details/${comic.id}`} key={comic.id}>
            <Box mt={2} display="flex" width="250px" height="106px" justifyContent="space-between" key={comic.id}>
              <Box width="30%">
                <img src={comic.image} alt={comic.name} className={classes.imageCard} />
              </Box>
              <Box paddingLeft={2} width="70%" display="flex" flexDirection="column" justifyContent="space-between">
                <div className={classes.comicTitle}>
                  <Typography variant="h6">{comic.name}</Typography>
                </div>
                <Typography variant="body2" color="text.secondary">
                  {comic.Genres?.[Math.floor(Math.random() * comic.Genres?.length)]?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${findTotalChap(comic.id!)} chương`}
                </Typography>
              </Box>
            </Box>
          </Link>
        );
      })}
    </div>
  );
};

export default RelationComic;
const useStyles = makeStyles((theme) => ({
  relateComicWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    width: '25%',
  },
  imageCard: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  comicTitle: {
    whiteSpace: 'normal',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
    overflow: 'hidden',
  },
}));
