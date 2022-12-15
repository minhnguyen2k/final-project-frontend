import React, { FC } from 'react';
import { Avatar, Box, Button, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { ILoginParams } from '../../../models/auth';
import TextFieldFormik from '../../../components/TextFieldFormik';

interface Props {
  handleLogin(values: ILoginParams): void;
}

const LoginForm: FC<Props> = ({ handleLogin }) => {
  const initialValues: ILoginParams = {
    email: '',
    password: '',
  };
  const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const onSubmit = (loginFormData: ILoginParams) => {
    handleLogin(loginFormData);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form noValidate>
              <TextFieldFormik name="email" margin="normal" label="Email" />
              <TextFieldFormik name="password" type="password" margin="normal" label="Mật khẩu" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Đăng nhập
              </Button>
              <Box textAlign="center">
                <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                  <Typography color="primary" variant="body2">
                    Chưa có tài khoản ? Đăng ký
                  </Typography>
                </Link>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
