import React, { FC, useCallback, useState } from 'react';
import { ISignUpParams } from '../../../models/auth';
import SignUpForm from '../components/SignUpForm';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../comic/common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {}

const SignUpPage: FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const handleSignUp = useCallback(
    async (values: ISignUpParams) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.register, 'post', values));
      if (json.success) {
        setIsLoading(false);
        toast.success('Đăng kí thành công', { containerId: 'A' });
        navigate('/login');
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch],
  );
  return <SignUpForm handleSignUp={handleSignUp} />;
};

export default SignUpPage;
