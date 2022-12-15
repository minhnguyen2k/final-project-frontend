import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Loader from '../../../../components/Loader';
import { API_PATHS } from '../../../../configs/api';
import { IUserInfo } from '../../../../models/user';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import UserForm from '../components/UserForm';
import { setSelectedComicInfo } from '../redux/comicAdminReducer';
import { setSelectedUserInfo, setUserListInfo } from '../redux/userAdminReducer';

interface Props {}

const UserEdit: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const userList = useSelector((state: AppState) => state.userAdmin.userList);
  const selectedUser = useSelector((state: AppState) => state.userAdmin.selectedUser);
  const handleUpdateUser = useCallback(
    async (userFormData: IUserInfo) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.updateUser}/${userFormData.id}`, 'put', userFormData));
      if (json.success) {
        setIsLoading(false);
        toast.success('Update successfully', { containerId: 'A' });
        const index = userList.findIndex((user) => user.id === json.data.id);
        userList.splice(index, 1, json.data);
        dispatch(setUserListInfo([...userList]));
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch],
  );
  useEffect(() => {
    const user = userList.find((user) => user.id === id);
    if (user) {
      dispatch(setSelectedUserInfo(user));
    }
  }, [userList, dispatch, id]);
  return (
    <>
      {isLoading && <Loader />}
      <UserForm userInfo={selectedUser} handleUpdateUser={handleUpdateUser} />
    </>
  );
};

export default UserEdit;
