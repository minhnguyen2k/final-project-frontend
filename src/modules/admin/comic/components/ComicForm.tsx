import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Autocomplete, Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { makeStyles } from '@mui/styles';

import { Form, Formik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import TextFieldFormik from '../../../../components/TextFieldFormik';
import { API_PATHS } from '../../../../configs/api';
import { IComicInfo } from '../../../../models/comic';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { setAuthorListInfo, setGenreListInfo } from '../redux/comicAdminReducer';

interface Props {
  isEditMode?: boolean;
  comicInfo?: IComicInfo | null;
  handleCreateComic?(comicFormData: IComicInfo, file: File): void;
  handleUpdateComic?(comicFormData: IComicInfo, file: File | null | undefined): void;
}

const ComicForm: FC<Props> = ({ isEditMode, comicInfo, handleCreateComic, handleUpdateComic }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const authorList = useSelector((state: AppState) => state.comicAdmin.authorList);
  const genreList = useSelector((state: AppState) => state.comicAdmin.genreList);
  const [imgSource, setImgSource] = useState<string>();
  const [file, setFile] = useState<File | null | undefined>();
  const [initialValues, setInitialValues] = useState<IComicInfo>({
    name: '',
    image: '',
    description: '',
    viewCount: 0,
    voteCount: 0,
    Authors: [],
    Genres: [],
  });

  const schema = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
      }),
    [],
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImgSource(file);
      setFile(e.target.files[0]);
    }
  };

  const getAllAuthor = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allAuthors, 'get'));
    dispatch(setAuthorListInfo(json.data));
  }, [dispatch]);
  const getAllGenres = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allGenres, 'get'));
    dispatch(setGenreListInfo(json.data));
  }, [dispatch]);
  const onSubmit = (comicFormData: IComicInfo) => {
    if (file && handleCreateComic) {
      handleCreateComic(comicFormData, file);
    } else if (handleUpdateComic) {
      handleUpdateComic(comicFormData, file);
    }
  };
  useEffect(() => {
    if (authorList.length === 0 && genreList.length === 0) {
      getAllAuthor();
      getAllGenres();
    }
  }, [getAllAuthor, getAllGenres]);
  useEffect(() => {
    if (isEditMode && comicInfo) {
      setInitialValues(comicInfo);
      setImgSource(comicInfo.image);
      setFile(null);
    }
  }, [comicInfo, isEditMode]);
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={schema} onSubmit={onSubmit}>
      {({ setFieldValue, values, touched, errors, resetForm }) => {
        return (
          <Form noValidate>
            <Paper elevation={3} className={classes.content}>
              <Box>
                <IconButton
                  sx={{ ml: -1, mb: 1 }}
                  onClick={() => {
                    navigate('/admin/pages/comics/manage-comic');
                  }}
                >
                  <ArrowCircleLeftIcon sx={{ color: '#236FBC', fontSize: '45px' }} />
                </IconButton>

                <Box>
                  {isEditMode && comicInfo && (
                    <Typography sx={{ color: '#236FBC' }} variant="h4" ml={1}>
                      {comicInfo.name}
                    </Typography>
                  )}
                  {!isEditMode && (
                    <Typography sx={{ color: '#236FBC' }} variant="h4">
                      ADD COMIC
                    </Typography>
                  )}
                  <Grid container mt={2} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Name <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <TextFieldFormik
                        inputProps={{ className: classes.input }}
                        className={classes.textFieldWrapper}
                        name="name"
                        size="small"
                      />
                    </Grid>

                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Description <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <TextFieldFormik
                        inputProps={{ className: classes.input }}
                        name="description"
                        multiline
                        fullWidth
                        rows={4}
                        size="small"
                      />
                    </Grid>

                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Image <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <Box display="flex" flexWrap="wrap" gap={2} alignItems="center" width={800}>
                        {imgSource && (
                          <Box>
                            <img className={classes.previewImg} src={imgSource} alt="preview" />
                          </Box>
                        )}
                        <Box width={124} height={124} border="1px dashed black ">
                          <Button
                            onClick={() => {
                              uploadInputRef.current?.click();
                            }}
                            sx={{ width: 124, height: 124 }}
                          >
                            <PhotoCameraIcon sx={{ transform: 'scale(2.8)', color: 'text.secondary' }} />
                          </Button>
                          <input ref={uploadInputRef} type="file" hidden onChange={handleUpload} />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Authors <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <Autocomplete
                        multiple
                        id="combo-box-demo"
                        disablePortal
                        options={authorList}
                        value={values.Authors}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        size="small"
                        onChange={(event, newValue) => {
                          if (newValue !== null) setFieldValue('Authors', newValue);
                        }}
                        className={classes.textFieldWrapper}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={values.Authors!.length === 0 ? 'Type author name to select' : ''}
                          />
                        )}
                      />
                    </Grid>
                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Genres <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <Autocomplete
                        multiple
                        id="combo-box-demo"
                        disablePortal
                        options={genreList}
                        value={values.Genres}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        size="small"
                        onChange={(event, newValue) => {
                          if (newValue !== null) setFieldValue('Genres', newValue);
                        }}
                        className={classes.textFieldWrapper}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={values.Genres!.length === 0 ? 'Type genre name to select' : ''}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <div className={classes.buttonsWrapper}>
                    <Button variant="contained" className={classes.saveButton} type="submit">
                      SAVE
                    </Button>
                    <Button
                      onClick={() => {
                        if (file && imgSource) {
                          setImgSource('');
                          setFile(null);
                        }
                        resetForm();
                      }}
                      variant="outlined"
                    >
                      CANCEL
                    </Button>
                  </div>
                </Box>
              </Box>
            </Paper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ComicForm;

const useStyles = makeStyles((theme) => ({
  content: {
    borderRadius: '0px',
    maxWidth: 1000,
    padding: theme.spacing(4),
  },
  input: {},
  textFieldWrapper: {
    width: '450px',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  seperateSpace: {
    height: '20px',
    background: theme.palette.primary.main,
  },
  submitButton: {
    minWidth: '150px',
    minHeight: '35px',
    backgroundColor: '#f0ad4e!important',
    color: '#fff',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  stickeyPanel: {
    position: 'sticky',
    bottom: '0',
    zIndex: '2',
    background: theme.palette.primary.main,
    boxShadow: '0 0 13px 0 #b18aff',
  },

  helperText: {
    margin: '0',
    backgroundColor: '#1b1b38',
    paddingTop: '4px',
    paddingLeft: '14px',
  },
  menu: {
    '& .Mui-selected': {
      backgroundColor: '#b18aff',
    },
    '& .Mui-selected:hover': {
      backgroundColor: '#b18aff',
    },
    background: theme.palette.primary.main,
  },
  menuItem: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0.1, 0.1)',
    },
  },
  menuPaper: {
    maxHeight: 240,
  },
  multipleLine: {
    '& .MuiSelect-select': {
      whiteSpace: 'normal',
    },
  },
  multilineTextField: {
    width: '600px',
    '& .MuiOutlinedInput-root': {
      backgroundColor: `#252547`,
    },
  },
  link: {
    color: 'cornflowerblue',
  },

  previewImg: {
    width: '124px',
    aspectRatio: 'auto 124 / 124',
    height: '124px',
  },
  deleteImage: {
    width: 1,
    height: 1,
    right: '0',
    top: '-10px',
  },

  editorClass: {
    height: '200px',
    padding: theme.spacing(1),
    border: '1px solid #ccc',
  },
  toolbarClass: {
    color: theme.palette.text.secondary,
    border: '1px solid #ccc',
  },
  switchStyle: {
    '& .MuiSwitch-track': {
      backgroundColor: '#F4F4F4',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#1ab394',
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#1ab394',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  saveButton: {
    backgroundColor: '#236FBC',
    marginRight: 10,
  },
}));
