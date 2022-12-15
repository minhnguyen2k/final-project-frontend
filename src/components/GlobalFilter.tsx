import { InputBase } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { Search as SearchIcon } from '@mui/icons-material';
import React, { FC, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';

interface Props {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  isDeleteDone: boolean;
}

const GlobalFilter: FC<Props> = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, isDeleteDone }) => {
  const classes = useStyles();
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((newValue) => {
    setGlobalFilter(newValue || undefined);
  }, 200);
  useEffect(() => {
    if (isDeleteDone) {
      setValue('');
      setGlobalFilter('');
    }
  }, [isDeleteDone, setGlobalFilter]);
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default GlobalFilter;

const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: '10px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    background: '#F4FBFF',
    borderRadius: 50,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
