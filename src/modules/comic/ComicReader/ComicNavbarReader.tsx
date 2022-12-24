import React, { FC, useState } from 'react';
import {
  Avatar,
  Box,
  AppBar,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  InputAdornment,
  Button,
  Autocomplete,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import HouseIcon from '@mui/icons-material/House';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListIcon from '@mui/icons-material/List';
import { generateComicDetailLink, generateReadComicLink } from '../../../utils/generalHelpers';
import { IComicInfo } from '../../../models/comic';
import { IChapInfo } from '../../../models/chap';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  comic: IComicInfo;
}

const ComicNavbarReader: FC<Props> = ({ comic }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleNavigateChapter = (chap: IChapInfo) => {
    navigate(generateReadComicLink(comic.name, chap.chapName, chap.id!));
  };
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
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        bgcolor: '#e4e4e4',
        borderRadius: '0px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container className={classes.navbarContainer}>
        <Toolbar sx={{ height: '50px', minHeight: '50px!important' }} disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              gap: '5px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={() => navigate('/')}>
              <HouseIcon className={classes.navigationIcon} />
            </IconButton>
            <IconButton sx={{ pl: 0 }} onClick={() => navigate(`${generateComicDetailLink(comic?.id!)}`)}>
              <ListIcon className={classes.navigationIcon} />
            </IconButton>
            <Button
              size="small"
              className={classes.navigationButtonWrapper}
              variant="contained"
              onClick={handlePreviousChap}
              disabled={comic.Chaps?.findIndex((chap) => chap.id === id) === comic.Chaps?.length! - 1}
            >
              <ArrowBackIosIcon sx={{ paddingLeft: '2px' }} />
            </Button>

            <Autocomplete
              id="combo-box-demo"
              disablePortal
              value={comic.Chaps?.find((chap: IChapInfo) => chap.id === id)}
              options={comic.Chaps ? comic.Chaps : []}
              getOptionLabel={(option) => option.chapName}
              sx={{ width: '35%' }}
              onChange={(event, newValue) => {
                if (newValue !== null) handleNavigateChapter(newValue);
              }}
              classes={{
                clearIndicator: classes.clearIndicator,
                popupIndicator: classes.popupIndicator,
              }}
              size="small"
              renderInput={(params) => <TextField {...params} placeholder="Nhập chương mà bạn muốn đọc" />}
            />
            <Button
              onClick={handleNextChap}
              size="small"
              className={classes.navigationButtonWrapper}
              variant="contained"
              disabled={comic.Chaps?.findIndex((chap) => chap.id === id) === 0}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ComicNavbarReader;

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    width: '1200px',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  clearIndicator: {
    color: 'black',
  },
  popupIndicator: {
    color: 'black',
  },
  logo: {
    width: '32px',
    height: '32px',
    marginRight: '12px',
    borderRadius: '8px',
  },
  navigationIcon: {
    color: '#d9534f',
    fontSize: '30px',
    '&:hover': {
      color: '#b71c1c',
    },
  },
  navigationButtonWrapper: {
    maxWidth: '33px',
    maxHeight: '33px',
    minWidth: '33px',
    minHeight: '33px',
    backgroundColor: '#d9534f',
    '&:hover': {
      backgroundColor: '#b71c1c',
    },
  },
}));
