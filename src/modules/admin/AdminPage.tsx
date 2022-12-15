import { makeStyles } from '@mui/styles';
import React, { FC, ReactChild, useRef } from 'react';
import CONFIG from '../../configs/AppConfigs';
import AdminDrawer from './components/AdminDrawer';
import AdminNavBar from './components/AdminNavBar';

interface Props {
  children: ReactChild | null;
}

const AdminPage: FC<Props> = ({ children }) => {
  const toolbarHeight = useRef(CONFIG.toolbarHeight);
  const drawerWidth = useRef(CONFIG.drawerWidth);
  const classes = useStyles({ toolbarHeight: toolbarHeight.current });

  return (
    <div className={classes.root}>
      <AdminNavBar toolbarHeight={toolbarHeight.current} drawerWidth={drawerWidth.current} />
      <AdminDrawer toolbarHeight={toolbarHeight.current} drawerWidth={drawerWidth.current} />
      <main className={classes.main}>
        <div className={classes.spacer} />
        <div className={classes.content}>{children}</div>
      </main>
    </div>
  );
};

export default AdminPage;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  spacer: ({ toolbarHeight }: { toolbarHeight: number }) => ({
    height: toolbarHeight,
  }),
  main: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    background: '#F4FBFF',
  },
  content: {
    padding: theme.spacing(2),
  },
}));
