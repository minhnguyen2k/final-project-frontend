import React, { FC, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { IChapImageInfo } from '../../../models/chap-image';
import { generateReadComicLink, sortObj } from '../../../utils/generalHelpers';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IComicInfo } from '../../../models/comic';
import { useNavigate, useParams } from 'react-router-dom';
import { findIndex } from 'lodash';

interface Props {
  chapImageList: IChapImageInfo[];
  comic: IComicInfo;
}
const ReadImage: FC<Props> = ({ chapImageList, comic }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const findChapIndex = useMemo(() => {
    const index = comic.Chaps?.findIndex((chap) => chap.id === id);
    return index;
  }, [comic.Chaps, id]);
  const handleNextChap = () => {
    let nextChap;
    const currentChapIndex = comic.Chaps?.findIndex((chap) => chap.id === id);
    if (currentChapIndex && currentChapIndex !== -1) {
      nextChap = comic.Chaps?.[currentChapIndex - 1];
      nextChap && navigate(generateReadComicLink(comic.name, nextChap.chapName, nextChap.id!));
    }
  };
  const handlePreviousChap = () => {
    let previousChap;
    const currentChapIndex = comic.Chaps?.findIndex((chap) => chap.id === id);
    if (typeof currentChapIndex === 'number' && currentChapIndex !== -1) {
      previousChap = comic.Chaps?.[currentChapIndex + 1];
      previousChap && navigate(generateReadComicLink(comic.name, previousChap.chapName, previousChap.id!));
    }
  };
  return (
    <div className={classes.root}>
      {sortObj(chapImageList, 'image', true).map((item: IChapImageInfo, index) => {
        return !(index === chapImageList.length - 1) ? (
          <div key={item.id}>
            <img src={item.image} alt={'chap-image'} />
          </div>
        ) : (
          <div key={item.id}>
            <img src={item.image} alt={'chap-image'} />
            {findChapIndex! < comic.Chaps?.length! - 1 && findChapIndex! > 0 ? (
              <Box mt={4} display="flex" height={150} width="100%">
                <Box width="50%" mr={2}>
                  <Button onClick={handlePreviousChap} fullWidth className={classes.navigationButtonWrapper}>
                    <ArrowBackIcon />
                    <Typography sx={{ flexShrink: 0 }} fontSize="18px">
                      Chapter trước
                    </Typography>
                  </Button>
                </Box>
                <Box width="50%">
                  <Button onClick={handleNextChap} fullWidth className={classes.navigationButtonWrapper}>
                    <Typography fontSize="18px">Chapter kế tiếp</Typography>
                    <ArrowForwardIcon />
                  </Button>
                </Box>
              </Box>
            ) : findChapIndex! === 0 ? (
              <Box mt={4} height={150} width="100%">
                <Button onClick={handlePreviousChap} fullWidth className={classes.navigationButtonWrapper}>
                  <ArrowBackIcon />
                  <Typography sx={{ flexShrink: 0 }} fontSize="18px">
                    Chapter trước
                  </Typography>
                </Button>
              </Box>
            ) : (
              <Box mt={4} height={150} width="100%">
                <Button onClick={handleNextChap} fullWidth className={classes.navigationButtonWrapper}>
                  <Typography fontSize="18px">Chapter kế tiếp</Typography>
                  <ArrowForwardIcon />
                </Button>
              </Box>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReadImage;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '50px',
  },
  navigationButtonWrapper: {
    border: '2px solid hsla(0,0%,100%,.4) ',
    borderStyle: 'dashed',
    padding: theme.spacing(5),
    color: theme.palette.text.secondary,
    '&:hover': {
      borderColor: 'rgb(255 255 255/1)',
      color: 'rgb(255 255 255/1)',
    },
    gap: '8px',
  },
}));
