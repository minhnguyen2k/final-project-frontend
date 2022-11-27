import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box, Chip, Tooltip, Fade } from '@mui/material';
import { IGenreInfo } from '../../../models/genre';
import { NavLink } from 'react-router-dom';
import { sortObj } from '../../../utils/generalHelpers';

interface Props {
  genreList: IGenreInfo[];
}

const GenreList: FC<Props> = ({ genreList }) => {
  const classes = useStyles();
  return (
    <div className={classes.genreListWrapper}>
      <Typography py="10px" px={1} textAlign="center" variant="h4" borderBottom="1px solid #dedede">
        Thể loại
      </Typography>
      <Box display="flex" pl={2} py={2} borderBottom="1px solid #dedede">
        <NavLink
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          className={(navData) => (navData.isActive ? classes.active : '')}
          to={`/genres`}
          end
        >
          <Chip sx={{ cursor: 'pointer', width: '120px' }} label="Tất cả thể loại" />
        </NavLink>
      </Box>

      <Box display="flex" pl={2} py={2} flexWrap="wrap" gap={2}>
        {sortObj(genreList, 'name').map((genre: IGenreInfo) => {
          return (
            <React.Fragment key={genre.id}>
              {genre.name.length >= 20 ? (
                <Tooltip
                  classes={{
                    tooltip: classes.customTooltip,
                  }}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  placement="top"
                  title={genre.name}
                >
                  <NavLink
                    style={{ width: '45%', textDecoration: 'none', cursor: 'pointer' }}
                    className={(navData) => (navData.isActive ? classes.active : '')}
                    to={`${genre.id!}`}
                  >
                    <Chip sx={{ width: '100%', cursor: 'pointer' }} label={genre.name} color="primary" />
                  </NavLink>
                </Tooltip>
              ) : (
                <NavLink
                  style={{ width: '45%', textDecoration: 'none', cursor: 'pointer' }}
                  className={(navData) => (navData.isActive ? classes.active : '')}
                  to={`/genres/${genre.id!}`}
                >
                  <Chip sx={{ width: '100%', cursor: 'pointer' }} label={genre.name} />
                </NavLink>
              )}
            </React.Fragment>
          );
        })}
      </Box>
    </div>
  );
};

export default GenreList;

const useStyles = makeStyles((theme) => ({
  genreListWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    width: '27%',
    border: '1px solid #fff',
    borderRadius: '25px',
  },
  customTooltip: {
    backgroundColor: '#e3f2fd',
    fontSize: '14px',
    color: theme.palette.text.primary,
  },
  imageCard: {
    height: '320px',
    width: '240px',
    objectFit: 'cover',
    marginRight: theme.spacing(3),
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    // borderRadius: '16px',
    // display: 'inline-flex',
    // width: 'fit-content',
    // textAlign: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '32px',
    // backgroundColor: theme.palette.primary.main,
    // transition:
    //   'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}));
