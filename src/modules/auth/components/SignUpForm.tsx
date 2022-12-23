import React, { FC } from 'react';
import { Avatar, Box, Button, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { ISignUpParams } from '../../../models/auth';
import TextFieldFormik from '../../../components/TextFieldFormik';

interface Props {
  handleSignUp(values: ISignUpParams): void;
}

const SignUpForm: FC<Props> = ({ handleSignUp }) => {
  const initialValues: ISignUpParams = {
    email: '',
    username: '',
    password: '',
    roleId: '',
    confirmPassword: '',
  };
  const validationSchema = yup.object({
    email: yup.string().required('Trường này không thể bỏ trống').email('Email phải đúng định dạng'),
    username: yup.string().required('Trường này không thể bỏ trống'),
    password: yup.string().required('Trường này không thể bỏ trống'),
    confirmPassword: yup
      .string()
      .required('Trường này không thể bỏ trống')
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp'),
  });
  const onSubmit = (signUpFormData: ISignUpParams) => {
    const { confirmPassword, ...data } = signUpFormData;
    handleSignUp(data);
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
          Đăng ký
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
              <TextFieldFormik name="username" margin="normal" label="Tên người dùng" />
              <TextFieldFormik name="password" type="password" margin="normal" label="Mật khẩu" />
              <TextFieldFormik name="confirmPassword" type="password" margin="normal" label="Xác nhận mật khẩu" />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Đăng ký
              </Button>
              <Box textAlign="center">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography color="primary" variant="body2">
                    Đã có tài khoản ? Đăng nhập
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

export default SignUpForm;
