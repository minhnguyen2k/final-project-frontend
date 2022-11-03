import React, { FC } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface Props {
  comic: any;
  sortType: string;
}

const ComicCard: FC<Props> = ({ comic, sortType }) => {
  const classes = useStyles();
  return (
    <>
      <Card elevation={0} className={classes.card}>
        <CardActionArea>
          <CardMedia
            style={{ height: sortType !== 'vote' ? 220 : 180, borderRadius: '12px' }}
            component="img"
            image={comic.image}
            title={comic.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.textWrapper} variant="h6">
              {comic.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ComicCard;

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    padding: '10px 3px ',
    minWidth: 0,
  },
  textWrapper: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));
