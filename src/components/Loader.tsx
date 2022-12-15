import React, { FC, ReactNode } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
interface Props {}

const Loader: FC<Props> = () => {
  const location = useLocation();
  const classes = useStyles();
  return (
    <div>
      {!location.pathname.includes('admin') ? (
        <Backdrop sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }} open={true}>
          <div className={classes.loading} style={{ height: 80 }}>
            <CircularProgress style={{ color: '#fb8c00' }} />
          </div>
        </Backdrop>
      ) : (
        <div className={classes.container}>
          <div className={classes.loader}>{<PulseLoader color="#236FBC" size={30} />}</div>
        </div>
      )}
    </div>
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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgb(255, 255, 255, .5)',
    zIndex: 9999,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%)',
  },
}));
