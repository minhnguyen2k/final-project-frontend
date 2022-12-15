import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../../../../redux/reducer';
import { setComicListInfo, setSelectedComicChapInfo, setSelectedComicInfo } from '../redux/comicAdminReducer';
import { useParams } from 'react-router-dom';
import ComicForm from '../components/ComicForm';
import { IComicInfo } from '../../../../models/comic';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { bookNameTransform } from '../../../../utils/generalHelpers';
import { API_PATHS } from '../../../../configs/api';
import { createFormData } from '../../../../utils/createFormDataFile';
import { toast } from 'react-toastify';
import Loader from '../../../../components/Loader';

interface Props {}

const ComicEdit: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const comicList = useSelector((state: AppState) => state.comicAdmin.comicList);
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const handleUpdateComic = useCallback(
    async (comicFormData: IComicInfo, file: File) => {
      setIsLoading(true);
      if (file) {
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
        const json = await dispatch(fetchThunk(`${API_PATHS.updateBook}/${comicFormData.id}`, 'put', comicFormData));
        if (json.success) {
          setIsLoading(false);
          toast.success('Update successfully', { containerId: 'A' });
          dispatch(setSelectedComicInfo({ ...json.data }));
          return;
        }
      } else {
        const json = await dispatch(fetchThunk(`${API_PATHS.updateBook}/${comicFormData.id}`, 'put', comicFormData));
        if (json.success) {
          setIsLoading(false);
          toast.success('Update successfully', { containerId: 'A' });
          const index = comicList.findIndex((comic) => comic.id === json.data.id);
          comicList.splice(index, 1, json.data);
          dispatch(setComicListInfo([...comicList]));
          return;
        }
        setIsLoading(false);
        toast.error(json.error, { containerId: 'A' });
      }
    },
    [dispatch],
  );
  useEffect(() => {
    const comic = comicList.find((comic) => comic.id === id);
    if (comic) {
      dispatch(setSelectedComicInfo(comic));
    }
  }, [comicList, dispatch, id]);
  return (
    <>
      {isLoading && <Loader />}
      <ComicForm isEditMode comicInfo={selectedComic} handleUpdateComic={handleUpdateComic} />
    </>
  );
};

export default ComicEdit;
