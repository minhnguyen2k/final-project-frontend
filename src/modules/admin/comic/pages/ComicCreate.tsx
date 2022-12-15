import React, { FC, useCallback, useState } from 'react';
import { IComicInfo } from '../../../../models/comic';
import ComicForm from '../components/ComicForm';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import { createFormData } from '../../../../utils/createFormDataFile';
import { bookNameTransform } from '../../../../utils/generalHelpers';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {}

const ComicCreate: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateComic = useCallback(
    async (comicFormData: IComicInfo, file: File) => {
      setIsLoading(true);
      const { timestamp, signature } = await dispatch(
        fetchThunk(
          `${API_PATHS.signCloudinary}?public_id=${bookNameTransform(comicFormData.name)}&folder=comics-thumbnail`,
          'get',
        ),
      );
      const response = await fetch(API_PATHS.uploadImage, {
        method: 'POST',
        mode: 'cors',
        body: createFormData(file, signature, timestamp, bookNameTransform(comicFormData.name), 'comics-thumbnail'),
      });
      const result = await response.json();
      if (result.secure_url) {
        comicFormData.image = result.secure_url;
      }
      const json = await dispatch(fetchThunk(API_PATHS.createBook, 'post', comicFormData));
      if (json.success) {
        setIsLoading(false);
        toast.success('Create successfully', { containerId: 'A' });
        navigate('/admin/pages/comics/manage-comic');
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
      <ComicForm handleCreateComic={handleCreateComic} />
    </>
  );
};

export default ComicCreate;
