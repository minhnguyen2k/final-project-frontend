import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AccountCircle, Mail as MailIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Cookies from 'js-cookie';
import { setUserInfo } from '../../auth/redux/authReducer';
import { AppState } from '../../../redux/reducer';
import {
  setAuthorListInfo,
  setChapListInfo,
  setComicListInfo,
  setGenreListInfo,
  setSelectedComicChapInfo,
  setSelectedComicInfo,
} from '../comic/redux/comicAdminReducer';
import { setRoleListInfo, setSelectedUserInfo, setUserListInfo } from '../comic/redux/userAdminReducer';

interface Props {
  drawerWidth: number;
  toolbarHeight: number;
}

const AdminNavBar: FC<Props> = ({ drawerWidth, toolbarHeight }) => {
  const classes = useNavbarStyles({ drawerWidth, toolbarHeight });
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const currentUser = useSelector((state: AppState) => state.profile.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <div className="root">
      <AppBar elevation={1} position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.title} />

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            color="inherit"
          >
            <AccountCircle className={classes.accountImage} />
          </IconButton>

          <Typography className={classes.accountName}>{currentUser?.username}</Typography>
        </Toolbar>
      </AppBar>

      {/* DROP DOWN MENU */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            dispatch(setUserInfo(null));
            dispatch(setComicListInfo([]));
            dispatch(setSelectedComicInfo(null));
            dispatch(setAuthorListInfo([]));
            dispatch(setGenreListInfo([]));
            dispatch(setChapListInfo([]));
            dispatch(setSelectedComicChapInfo(null));
            dispatch(setUserListInfo([]));
            dispatch(setSelectedUserInfo(null));
            dispatch(setRoleListInfo([]));
            Cookies.remove(ACCESS_TOKEN_KEY);
            navigate('/');
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminNavBar;

const useNavbarStyles = makeStyles((theme) => ({
  toolbar: ({ toolbarHeight }: Props) => ({
    // paddingRight: 24, // keep right padding when drawer closed
    paddingRight: 34,
    height: toolbarHeight,
  }),
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    // ...theme.mixins.toolbar,
  },
  appBar: {
    background: theme.palette.background.default,
    borderRadius: '0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: '#707070',
  },
  appBarShift: ({ drawerWidth }: Props) => ({
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  accountImage: {
    fontSize: 50,
  },
  accountName: {
    marginLeft: 10,
  },
  title: {
    flexGrow: 1,
  },
}));
