import React, { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
interface Props {}

const Loader: FC<Props> = () => {
  const classes = useStyles();
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }} open={true}>
      <div className={classes.loading} style={{ height: 80 }}>
        <CircularProgress style={{ color: '#fb8c00' }} />
      </div>
    </Backdrop>
  );
};

export default Loader;

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));
