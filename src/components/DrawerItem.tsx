import { Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DrawerItem } from '../modules/admin/components/AdminDrawer';

const DrawItem: FC<DrawerItem> = ({ itemName, path, icon, disabled, isDivider }) => {
  const classes = useStyles();
  return (
    <>
      {isDivider && <Divider sx={{ borderColor: '#DFE3E6' }} />}
      <NavLink
        to={path}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
        className={(navData) => (navData.isActive ? classes.active : classes.link)}
      >
        <ListItem className={clsx(classes.sideBarListItem, disabled && classes.disabledLink)}>
          {icon && <ListItemIcon sx={{ minWidth: '40px', color: !disabled ? '#303030' : '' }}>{icon}</ListItemIcon>}
          <ListItemText primary={<Typography className={classes.itemName}>{itemName}</Typography>} />
        </ListItem>
      </NavLink>
    </>
  );
};

export default DrawItem;

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#B0B0B0',
  },
  sideBarListItem: {
    '&:hover:not($disabledLink)': {
      color: theme.palette.text.secondary,
    },
  },
  itemName: {
    whiteSpace: 'normal',
  },
  disabledLink: {
    cursor: 'default',
  },
  active: {
    textDecoration: 'none',
    color: '#303030',
  },
}));
