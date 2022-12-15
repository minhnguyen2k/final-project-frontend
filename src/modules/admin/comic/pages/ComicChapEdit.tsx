import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../../../../redux/reducer';
import { setSelectedComicChapInfo, setSelectedComicInfo } from '../redux/comicAdminReducer';
import { useParams } from 'react-router-dom';
import ComicForm from '../components/ComicForm';
import { IComicInfo } from '../../../../models/comic';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { bookNameTransform } from '../../../../utils/generalHelpers';
import { API_PATHS } from '../../../../configs/api';
import { createFormData } from '../../../../utils/createFormDataFile';
import { IChapInfo } from '../../../../models/chap';
import ComicChapForm from '../components/ComicChapForm';
import { toast } from 'react-toastify';
import Loader from '../../../../components/Loader';

interface Props {}

const ComicChapEdit: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const chapList = useSelector((state: AppState) => state.comicAdmin.comicChapList);
  const selectedComicChap = useSelector((state: AppState) => state.comicAdmin.selectedComicChap);
  const handleUpdateChap = useCallback(
    async (chapFormData: IChapInfo) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.updateChap}/${chapFormData.id}`, 'put', chapFormData));
      if (json.success) {
        setIsLoading(false);
        toast.success('Update successfully', { containerId: 'A' });
        dispatch(setSelectedComicChapInfo(json.data));
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch],
  );
  useEffect(() => {
    const chap = chapList.find((chap) => chap.id === id);
    if (chap) {
      dispatch(setSelectedComicChapInfo(chap));
    }
  }, [chapList, dispatch, id]);
  return (
    <>
      {isLoading && <Loader />}
      <ComicChapForm isEditMode chapInfo={selectedComicChap} handleUpdateChap={handleUpdateChap} />
    </>
  );
};

export default ComicChapEdit;
