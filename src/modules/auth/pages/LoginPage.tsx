import React, { FC, useState, useCallback } from 'react';
import { ILoginParams } from '../../../models/auth';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../comic/common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { setUserInfo } from '../redux/authReducer';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { toast } from 'react-toastify';

interface Props {}

const LoginPage: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const handleLogin = useCallback(
    async (values: ILoginParams) => {
      setIsLoading(true);
      const data = await dispatch(fetchThunk(API_PATHS.signIn, 'post', values));
      if (data.success) {
        Cookies.set(ACCESS_TOKEN_KEY, data.token);
        dispatch(setUserInfo(data.userInfo));
        toast.success('Đăng nhập thành công', { containerId: 'A' });
        data.userInfo.Role.name !== 'admin' ? navigate('/') : navigate('/admin/pages/comics/manage-comic');
      }
      setIsLoading(false);
      toast.error(data.error, { containerId: 'A' });
    },
    [dispatch, navigate],
  );
  return (
    <div>
      <LoginForm handleLogin={handleLogin} />
      {isLoading && <Loader />}
    </div>
  );
};

export default LoginPage;
