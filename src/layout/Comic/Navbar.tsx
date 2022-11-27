import React, { FC } from 'react';
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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

interface Props {}

const pages = ['Trang chủ', 'Thể loại', 'Lịch sử', 'Bộ lọc'];

const Navbar = (props: Props) => {
  const classes = useStyles();
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
          <Typography
            fontSize="15px"
            noWrap
            component="a"
            href="/"
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 3, marginLeft: '20px' }}>
            {pages.map((page) => (
              <Typography fontSize="14px" color="textPrimary" key={page}>
                {page}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <TextField
              size="small"
              placeholder="Search book name"
              sx={{
                '.MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  fontSize: '14px',
                },
                '& fieldset': { border: 'none' },
                marginRight: '20px',
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
                    <IconButton sx={{ padding: '0px' }}>
                      <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="outlined" sx={{ height: '30px', borderRadius: '20px' }}>
              Đăng nhập
            </Button>
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
