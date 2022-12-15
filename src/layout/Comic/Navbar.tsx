import React, { useCallback, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../utils/constants';
import { fetchThunk } from '../../modules/comic/common/redux/thunk';
import { API_PATHS } from '../../configs/api';
import { setUserInfo } from '../../modules/auth/redux/authReducer';

interface Props {}

const pages = ['Trang chủ', 'Thể loại', 'Lịch sử', 'Bộ lọc'];

const Navbar = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentUser = useSelector((state: AppState) => state.profile.user);
  const [searchFieldComic, setSearchFieldComic] = useState('');
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  const handleLogout = () => {
    dispatch(setUserInfo(null));
    Cookies.remove(ACCESS_TOKEN_KEY);
    navigate('/login');
  };
  const getCurrentUser = useCallback(async () => {
    if (!currentUser && token) {
      const data = await dispatch(fetchThunk(API_PATHS.currentUser, 'get'));
      dispatch(setUserInfo(data.user));
    }
  }, [currentUser, dispatch, token]);
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AppBar
      elevation={1}
      position="fixed"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '0px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container className={classes.navbarContainer}>
        <Toolbar variant="dense" disableGutters>
          <img src="/TG-Logo.jpg" alt="Kitty Katty!" className={classes.logo} />
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              fontSize="15px"
              noWrap
              color="textPrimary"
              sx={{
                ml: 1,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              Freemics
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, marginLeft: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Typography fontSize="14px" color="textPrimary">
                Trang chủ
              </Typography>
            </Link>
            <Link to="/genres" style={{ textDecoration: 'none' }}>
              <Typography fontSize="14px" color="textPrimary">
                Thể loại
              </Typography>
            </Link>
            <Link to="/comic/filter" style={{ textDecoration: 'none' }}>
              <Typography fontSize="14px" color="textPrimary">
                Bộ lọc
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <TextField
              size="small"
              placeholder="Search book name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (searchFieldComic.trim() === '') {
                    return;
                  }
                  setSearchFieldComic('');
                  navigate(`/comic/search?name=${searchFieldComic}`);
                }
              }}
              sx={{
                '.MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontSize: '14px',
                },
                '& fieldset': { border: 'none' },
                marginRight: '20px',
              }}
              onChange={(e) => {
                setSearchFieldComic(e.target.value);
              }}
              InputProps={{
                sx: {
                  height: '30px',
                  width: '220px',
                  backgroundColor: 'grey.100',
                  '&::placeholder': {
                    fontSize: '14px',
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        if (searchFieldComic.trim() === '') {
                          return;
                        }
                        setSearchFieldComic('');
                        navigate(`/comic/search?name=${searchFieldComic.trim()}`);
                      }}
                      sx={{ padding: '0px' }}
                    >
                      <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!currentUser ? (
              <>
                <Button
                  onClick={() => {
                    navigate('/login');
                  }}
                  variant="outlined"
                  sx={{ height: '30px', borderRadius: '20px', mr: 1 }}
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                  variant="contained"
                  sx={{ height: '30px', borderRadius: '20px', px: 3 }}
                >
                  Đăng ký
                </Button>
              </>
            ) : (
              <Box display="inline-flex" alignItems="center">
                <Typography color="textPrimary">Hi</Typography>
                <Typography ml={1} mr={2} variant="h5" color="textPrimary">
                  {currentUser.username}
                </Typography>
                <Button size="small" onClick={handleLogout} variant="outlined">
                  Đăng xuất
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    width: '1200px',
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  logo: {
    width: '32px',
    height: '32px',
    marginRight: '12px',
    borderRadius: '8px',
  },
}));
