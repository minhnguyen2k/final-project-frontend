import React, { FC, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Fade, Grid, Tooltip } from '@mui/material';
import { IChapInfo } from '../../../../models/chap';
import { Link } from 'react-router-dom';
import { generateReadComicLink, sortObj } from '../../../../utils/generalHelpers';
interface Props {
  chapList: IChapInfo[];
  bookName: string;
}

const ChapterList: FC<Props> = ({ chapList, bookName }) => {
  const classes = useStyles();
  return (
    <Grid sx={{ mt: 1 }} container spacing={2}>
      {sortObj(chapList, 'chapName', true)
        .reverse()
        .map((chap: IChapInfo) => (
          <Grid key={chap.id} item xs={3}>
            {chap.chapName.length < 23 ? (
              <Link style={{ textDecoration: 'none' }} to={generateReadComicLink(bookName, chap.chapName, chap.id!)}>
                <Button variant="outlined" className={classes.chapNameButton}>
                  {chap.chapName}
                </Button>
              </Link>
            ) : (
              <Tooltip
                classes={{
                  tooltip: classes.customTooltip,
                }}
                arrow
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                placement="top"
                title={chap.chapName}
              >
                <Link style={{ textDecoration: 'none' }} to={generateReadComicLink(bookName, chap.chapName, chap.id!)}>
                  <Button variant="outlined" className={classes.chapNameButton}>
                    {chap.chapName}
                  </Button>
                </Link>
              </Tooltip>
            )}
          </Grid>
        ))}
    </Grid>
  );
};

export default ChapterList;

const useStyles = makeStyles((theme) => ({
  imageCard: {
    height: '320px',
    width: '240px',
    objectFit: 'cover',
    marginRight: theme.spacing(3),
  },
  customTooltip: {
    backgroundColor: '#e3f2fd',
    fontSize: '14px',
    color: theme.palette.text.primary,
    width: '200px',
  },
  chapNameButton: {
    width: '200px',
    color: theme.palette.text.primary,
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&.MuiButton-outlined': {
      borderColor: 'rgba(0,0,0,.12)',
    },
  },
}));
