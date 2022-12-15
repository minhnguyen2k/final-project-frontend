import { Drawer, List } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  FormatListBulleted as FormatListBulletedIcon,
  MenuBook as MenuBookIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import clsx from 'clsx';
import React, { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NestedDrawerItem from '../../../components/NestedDrawerItem';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookIcon from '@mui/icons-material/Book';
import DrawerItem from '../../../components/DrawerItem';
import { isNotNull } from '../../../utils/generalHelpers';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';

interface Props {
  drawerWidth: number;
  toolbarHeight: number;
}

export interface DrawerItem {
  itemName: string;
  path: string;
  isDivider?: boolean;
  exact?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  subItems?: DrawerItem[];
  expanded?: boolean;
}

const AdminDrawer: FC<Props> = ({ drawerWidth, toolbarHeight }) => {
  const classes = useStyles({ drawerWidth, toolbarHeight });
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const selectedComicChap = useSelector((state: AppState) => state.comicAdmin.selectedComicChap);
  const selectedUser = useSelector((state: AppState) => state.userAdmin.selectedUser);
  const location = useLocation();
  const drawerItems: (DrawerItem | null)[] = useMemo(() => {
    return [
      {
        itemName: 'Comic List',
        icon: <FormatListBulletedIcon />,
        path: '/admin/pages/comics/manage-comic',
      },
      {
        itemName: 'Comic Details',
        icon: <BookIcon />,
        path: `/admin/pages/comics/comic-detail/${selectedComic?.id}`,
        disabled: !selectedComic,
      },
      {
        itemName: 'Comic Chap',
        icon: <MenuBookIcon />,
        path: '/admin/pages/comics/manage-comic-chap',
        disabled: !selectedComic,
      },
      {
        itemName: 'Comic Chap Image',
        icon: <ImageIcon />,
        path: '/admin/pages/comics/manage-comic-chap-image',
        disabled: !selectedComicChap,
      },
      {
        itemName: 'User List',
        isDivider: true,
        icon: <RecentActorsIcon />,
        path: '/admin/pages/comics/manage-user',
      },
      {
        itemName: 'User Details',
        icon: <AssignmentIndIcon />,
        path: `/admin/pages/comics/user-detail/${selectedUser?.id}`,
        disabled: !selectedUser,
      },
    ];
  }, [selectedComic, selectedComicChap, selectedUser]);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper),
      }}
      open={false}
    >
      <div className={clsx(classes.spacer, classes.drawerSpacer)}>
        <Link style={{ textDecoration: 'none' }} to="/admin/pages/comics/manage-comic">
          <h1 className={classes.logo}>Logo</h1>
        </Link>
      </div>

      <List className={classes.sideBarList}>
        {drawerItems.filter(isNotNull).map((item) => {
          return item.subItems ? (
            <NestedDrawerItem key={item.itemName} {...item} />
          ) : (
            <DrawerItem key={item.itemName} {...item} />
          );
        })}
      </List>
    </Drawer>
  );
};

export default AdminDrawer;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: ({ drawerWidth }: Props) => ({
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    borderRadius: '0px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  spacer: ({ toolbarHeight }: Props) => ({
    height: toolbarHeight,
  }),
  drawerSpacer: {
    background: '#236FBC',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  sideBarList: {
    paddingTop: theme.spacing(4),
  },
  logo: {
    color: '#ffffff',
  },
}));
