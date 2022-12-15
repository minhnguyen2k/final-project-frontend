import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerItem } from '../modules/admin/components/AdminDrawer';
import DrawItem from './DrawerItem';

const NestedDrawerItem: FC<DrawerItem> = ({ itemName, path, icon, disabled = false, subItems, expanded = false }) => {
  const classes = useStyles();
  const [openSubItems, setOpenSubItem] = useState<boolean>(false);

  useEffect(() => {
    setOpenSubItem(expanded);
  }, [expanded]);

  return (
    <>
      <NavLink
        to={path}
        className={(navData) => (navData.isActive ? classes.active : classes.link)}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <ListItem
          className={clsx(classes.sideBarListItem, disabled && classes.disabledLink)}
          onClick={() => {
            if (!disabled) {
              setOpenSubItem((prev) => !prev);
            }
          }}
        >
          {icon && <ListItemIcon sx={{ minWidth: '40px' }}>{icon}</ListItemIcon>}
          <ListItemText primary={<Typography className={classes.itemName}>{itemName}</Typography>} />
          {subItems && (openSubItems ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItem>
      </NavLink>
      {!disabled && subItems && (
        <Collapse className={classes.nested} in={openSubItems} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subItems.map((item) => {
              return item.subItems ? (
                <NestedDrawerItem key={item.itemName} {...item} />
              ) : (
                <DrawItem key={item.itemName} {...item} />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default NestedDrawerItem;

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
