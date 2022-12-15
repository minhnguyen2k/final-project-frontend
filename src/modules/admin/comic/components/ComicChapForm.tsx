import React, { FC, useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { makeStyles } from '@mui/styles';

import { Form, Formik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as yup from 'yup';
import TextFieldFormik from '../../../../components/TextFieldFormik';
import { IChapInfo } from '../../../../models/chap';
import { AppState } from '../../../../redux/reducer';

interface Props {
  isEditMode?: boolean;
  chapInfo?: IChapInfo | null;
  handleCreateChap?(bookId: string, chapNameList: string[]): void;
  handleUpdateChap?(chapFormData: IChapInfo): void;
}

const ComicChapForm: FC<Props> = ({ isEditMode, chapInfo, handleCreateChap, handleUpdateChap }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [createdChapList, setCreatedChapList] = useState<string[]>(['']);
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const [validateCreatedChapList, setValidateCreatedChapList] = useState(false);
  const [initialValues, setInitialValues] = useState<IChapInfo>({
    chapName: '',
  });

  const schema = useMemo(
    () =>
      yup.object({
        chapName: yup.string().required(),
      }),
    [],
  );
  const handleAddMoreChap = () => {
    setCreatedChapList((prev) => {
      return [...prev, ''];
    });
  };
  const handleChangeChapName = (value: string, chapIndex: number) => {
    setCreatedChapList((prev) => {
      prev[chapIndex] = value;
      return [...prev];
    });
  };
  const handleRemoveChap = (chapIndex: number) => {
    setCreatedChapList((prev) => {
      const filteredCreatedChapList = prev.filter((_, index) => index !== chapIndex);
      return filteredCreatedChapList;
    });
  };
  const onSubmit = (chapFormData: IChapInfo) => {
    if (handleUpdateChap) {
      handleUpdateChap(chapFormData);
    }
  };
  const handleSubmit = () => {
    if (createdChapList.includes('')) {
      setValidateCreatedChapList(true);
      return;
    }
    if (handleCreateChap && selectedComic && selectedComic.id) {
      handleCreateChap(selectedComic.id, createdChapList);
    }
  };
  useEffect(() => {
    if (!createdChapList.includes('')) {
      setValidateCreatedChapList(false);
    }
  }, [createdChapList]);
  useEffect(() => {
    if (isEditMode && chapInfo) {
      setInitialValues(chapInfo);
    }
  }, [chapInfo, isEditMode]);
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
                    navigate('/admin/pages/comics/manage-comic-chap');
                  }}
                >
                  <ArrowCircleLeftIcon sx={{ color: '#236FBC', fontSize: '45px' }} />
                </IconButton>

                <Box>
                  {isEditMode && chapInfo && (
                    <Typography sx={{ color: '#236FBC' }} variant="h4" ml={1}>
                      {chapInfo.chapName}
                    </Typography>
                  )}
                  {!isEditMode && (
                    <Typography sx={{ color: '#236FBC' }} variant="h4">
                      ADD CHAP
                    </Typography>
                  )}
                  <Box mt={3} ml={10} display="flex" flexWrap="wrap" gap={3} alignItems="center">
                    {createdChapList.map((chapInput, index) => {
                      return (
                        <Box display="flex" alignItems="center" gap={2} key={index}>
                          <Typography>
                            Name <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          {isEditMode && chapInfo ? (
                            <TextFieldFormik
                              inputProps={{ className: classes.input }}
                              className={classes.textFieldWrapper}
                              name="chapName"
                              size="small"
                            />
                          ) : (
                            <TextFieldFormik
                              inputProps={{ className: classes.input }}
                              className={classes.textFieldWrapper}
                              value={chapInput}
                              name="name"
                              onChange={(e) => {
                                handleChangeChapName(e.target.value, index);
                              }}
                              size="small"
                            />
                          )}
                          {!isEditMode && !chapInfo && index > 0 && (
                            <IconButton
                              onClick={() => {
                                handleRemoveChap(index);
                              }}
                              sx={{ padding: '0px' }}
                            >
                              <HighlightOffIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                            </IconButton>
                          )}
                        </Box>
                      );
                    })}
                    {!isEditMode && !chapInfo && (
                      <Box width="200px">
                        <Button
                          startIcon={<AddIcon />}
                          variant="contained"
                          onClick={handleAddMoreChap}
                          sx={{ bgcolor: '#236FBC' }}
                        >
                          Add More Chap
                        </Button>
                      </Box>
                    )}
                    {validateCreatedChapList && (
                      <Box>
                        <Alert severity="error">field name is required</Alert>
                      </Box>
                    )}
                  </Box>
                  <div className={classes.buttonsWrapper}>
                    {isEditMode && chapInfo ? (
                      <Button variant="contained" className={classes.saveButton} type="submit">
                        SAVE
                      </Button>
                    ) : (
                      <Button variant="contained" className={classes.saveButton} onClick={handleSubmit}>
                        SAVE
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        if (!isEditMode && !chapInfo) {
                          setCreatedChapList(['']);
                        } else {
                          resetForm();
                        }
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

export default ComicChapForm;

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
    marginTop: theme.spacing(5),
  },
  saveButton: {
    backgroundColor: '#236FBC',
    marginRight: 10,
  },
}));
