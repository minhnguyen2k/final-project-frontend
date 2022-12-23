import React, { FC, useMemo } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Zoom } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { generateComicDetailLink } from '../../../utils/generalHelpers';
import { ChapTotal, IComicInfo } from '../../../models/comic';

interface Props {
  comic: IComicInfo;
  sortType: string;
  width?: string;
  height?: string;
  chapTotal?: ChapTotal[];
}

const ComicCard: FC<Props> = ({ comic, sortType, width, height, chapTotal }) => {
  const classes = useStyles();
  const history = useNavigate();
  const comicDetailLink = useMemo(() => {
    return generateComicDetailLink(comic.id!);
  }, [comic.id]);
  const totalChap = useMemo(() => {
    const item = chapTotal?.find((elm) => elm.id === comic.id);
    return item?.chapTotal ?? undefined;
  }, [chapTotal, comic.id]);

  return (
    <Card elevation={0} sx={{ width: width || 'auto' }} className={classes.card}>
      <CardActionArea onClick={() => history(comicDetailLink)}>
        <div style={{ overflow: 'hidden' }}>
          <CardMedia
            sx={{
              height: sortType !== 'vote' ? height || 220 : 180,
              borderRadius: '12px',
              border: '6px solid #F8F9FA',
              transition: 'transform .3s ease;  ',
              '&:hover': { transform: 'scale(1.1)' },
            }}
            component="img"
            image={comic.image}
            title={comic.name}
          />
        </div>
        <CardContent className={classes.cardContent}>
          {chapTotal && (
            <Typography className={classes.textWrapper} variant="subtitle2">
              {totalChap} Chương
            </Typography>
          )}
          <Typography className={classes.textWrapper} variant="h6">
            {comic.name}
          </Typography>
          {sortType === 'newChapter' && (
            <Typography className={classes.textWrapper} variant="h6">
              {comic.Chaps?.[0].chapName}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
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
