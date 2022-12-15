import { Autocomplete, Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';

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
import { IUserInfo } from '../../../../models/user';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { setGenreListInfo } from '../redux/comicAdminReducer';
import { setRoleListInfo } from '../redux/userAdminReducer';

interface Props {
  userInfo: IUserInfo | null;
  handleUpdateUser(userFormData: IUserInfo): void;
}

const UserForm: FC<Props> = ({ userInfo, handleUpdateUser }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const roleList = useSelector((state: AppState) => state.userAdmin.roleList);
  const [initialValues, setInitialValues] = useState<IUserInfo>({
    email: '',
    username: '',
    roleId: '',
  });

  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().required(),
        username: yup.string().required(),
      }),
    [],
  );

  const getAllRoles = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.allRoles, 'get'));
    dispatch(setRoleListInfo(json.data));
  }, [dispatch]);
  const onSubmit = (userFormData: IUserInfo) => {
    handleUpdateUser(userFormData);
  };
  useEffect(() => {
    if (roleList.length === 0) {
      getAllRoles();
    }
  }, [getAllRoles]);
  useEffect(() => {
    if (userInfo) {
      setInitialValues(userInfo);
    }
  }, [userInfo]);
  return (
    <Formik initialValues={initialValues} enableReinitialize validationSchema={schema} onSubmit={onSubmit}>
      {({ setFieldValue, values, errors, resetForm }) => {
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
                  <Typography mb={1} sx={{ color: '#236FBC' }} variant="h4" ml={1}>
                    {userInfo?.email}
                  </Typography>

                  <Grid container mt={2} rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center">
                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Email <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <TextFieldFormik
                        inputProps={{ className: classes.input }}
                        className={classes.textFieldWrapper}
                        name="email"
                        size="small"
                      />
                    </Grid>

                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Username <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <TextFieldFormik
                        inputProps={{ className: classes.input }}
                        className={classes.textFieldWrapper}
                        name="username"
                        size="small"
                      />
                    </Grid>
                    <Grid className={classes.alignRight} item xs={2}>
                      <Typography>
                        Role <span style={{ color: 'red' }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid className={classes.alignLeft} item xs={10}>
                      <TextFieldFormik className={classes.textFieldWrapper} name="roleId" size="small" select>
                        {roleList.map((role) => {
                          return (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          );
                        })}
                      </TextFieldFormik>
                    </Grid>
                  </Grid>
                  <div className={classes.buttonsWrapper}>
                    <Button variant="contained" className={classes.saveButton} type="submit">
                      SAVE
                    </Button>
                    <Button
                      onClick={() => {
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

export default UserForm;

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
