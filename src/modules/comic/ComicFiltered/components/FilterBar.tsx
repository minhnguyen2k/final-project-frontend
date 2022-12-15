import React, { FC, useEffect, useMemo, useState } from 'react';
import { IComicInfo, IFilterComic } from '../../../../models/comic';
import { IGenreInfo } from '../../../../models/genre';
import * as yup from 'yup';
import { Autocomplete, Box, Button, MenuItem, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import TextFieldFormik from '../../../../components/TextFieldFormik';

interface Props {
  genreList: IGenreInfo[];
  getComicsByFilter(filterFormData: IFilterComic): void;
}

const FilterBar: FC<Props> = ({ genreList, getComicsByFilter }) => {
  const classes = useStyles();
  const [initialValues, setInitialValues] = useState<IFilterComic>({
    genreId: '',
    chapCount: 0,
    sortBy: 'newChapter',
  });

  const schema = useMemo(() => yup.object({}), []);
  const onSubmit = (filterFormData: IFilterComic) => {
    getComicsByFilter(filterFormData);
  };
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={schema} onSubmit={onSubmit}>
      {({ setFieldValue }) => {
        return (
          <Form noValidate>
            <Box pl={3} my={5} display="flex" justifyContent="space-between" alignItems="center">
              <Autocomplete
                id="combo-box-demo"
                disablePortal
                options={genreList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                size="small"
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setFieldValue('genreId', newValue.id);
                  } else {
                    setFieldValue('genreId', '');
                  }
                }}
                className={classes.textFieldWrapper}
                renderInput={(params) => <TextField {...params} placeholder="Nhập thể loại để chọn" />}
              />
              <TextFieldFormik className={classes.textFieldWrapper} name="sortBy" size="small" select>
                <MenuItem value="newChapter">Chapter mới</MenuItem>
                <MenuItem value="newBook">Truyện mới</MenuItem>
                <MenuItem value="mostViewed">Xem nhiều nhất</MenuItem>
                <MenuItem value="maxChapter">Số chapter nhiều nhất</MenuItem>
              </TextFieldFormik>
              <TextFieldFormik className={classes.textFieldWrapper} name="chapCount" size="small" select>
                <MenuItem value={0}>{'> 0 Chapter'}</MenuItem>
                <MenuItem value={10}>{'>=10 Chapter'}</MenuItem>
                <MenuItem value={50}>{'>=50 Chapter'}</MenuItem>
                <MenuItem value={100}>{'>=100 Chapter'}</MenuItem>
              </TextFieldFormik>
              <Button variant="contained" className={classes.saveButton} type="submit">
                SAVE
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FilterBar;

const useStyles = makeStyles((theme) => ({
  content: {
    borderRadius: '0px',
    maxWidth: 1000,
    padding: theme.spacing(4),
  },
  textFieldWrapper: {
    width: '300px',
  },

  saveButton: {
    backgroundColor: '#236FBC',
    marginRight: 10,
  },
}));
