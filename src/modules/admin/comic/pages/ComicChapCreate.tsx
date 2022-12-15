import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import ComicChapForm from '../components/ComicChapForm';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {}

const ComicChapCreate: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateChap = useCallback(
    async (bookId: string, chapNameList: string[]) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.createChap, 'post', { bookId, chapNameList }));
      if (json.success) {
        setIsLoading(false);
        toast.success('Create successfully', { containerId: 'A' });
        navigate('/admin/pages/comics/manage-comic-chap');
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch],
  );
  return (
    <>
      {isLoading && <Loader />}
      <ComicChapForm handleCreateChap={handleCreateChap} />
    </>
  );
};

export default ComicChapCreate;
