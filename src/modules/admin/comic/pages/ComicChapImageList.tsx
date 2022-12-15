import { makeStyles } from '@mui/styles';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CollectionsIcon from '@mui/icons-material/Collections';

import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Loader from '../../../../components/Loader';
import { API_PATHS } from '../../../../configs/api';
import { IChapImageInfo } from '../../../../models/chap-image';
import { AppState } from '../../../../redux/reducer';
import {
  bookNameTransform,
  getImageNameExcludeFormat,
  getLastPage,
  getShortImageName,
  sortObj,
} from '../../../../utils/generalHelpers';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import ComicChapImageCard from '../components/ComicChapImageCard';
import { createFormData } from '../../../../utils/createFormDataFile';
import { toast } from 'react-toastify';

interface Props {}

const ComicChapImageList: FC<Props> = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatedSuccess, setIsCreatedSuccess] = useState(false);
  const [checkedImageList, setCheckedImageList] = useState<number[]>([]);
  const [imgSourceList, setImgSourceList] = useState<string[]>([]);
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const selectedComicChap = useSelector((state: AppState) => state.comicAdmin.selectedComicChap);
  const [chapImageList, setChapImageList] = useState<IChapImageInfo[]>([]);
  const getAllChapImages = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.allChapImage}/${selectedComicChap?.id}`, 'get'));
    setChapImageList([...json.data]);
    if (json.data.length === 0) setCheckedImageList([1]);
    setIsLoading(false);
    setIsDeleteDone(false);
  }, [dispatch]);
  console.log(chapImageList);
  const handleCreateChapImage = useCallback(
    async (fileList: File[]) => {
      setIsLoading(true);
      setIsCreatedSuccess(false);
      let lastPage: number =
        chapImageList.length > 0 ? Number(getLastPage(chapImageList[chapImageList.length - 1].image)) : 0;
      const requests = fileList.map(async (file) => {
        let publicId = '';
        let folder = '';
        if (selectedComic && selectedComicChap) {
          publicId = file.name.includes('page' || 'Page')
            ? file.name.replace('.jpg', '')
            : `${bookNameTransform(selectedComic.name)}-${bookNameTransform(selectedComicChap.chapName)}-page-${
                lastPage + 1
              }`;
          folder = `comics/${bookNameTransform(selectedComic.name)}/${bookNameTransform(selectedComicChap.chapName)}`;
          lastPage += 1;
        }
        const { timestamp, signature } = await dispatch(
          fetchThunk(`${API_PATHS.signCloudinary}?public_id=${publicId}&folder=${folder}`, 'get'),
        );
        return fetch(API_PATHS.uploadImage, {
          method: 'POST',
          mode: 'cors',
          body: createFormData(file, signature, timestamp, publicId, folder),
        }).then((res) => res.json());
      });
      try {
        const response = await Promise.all(requests);
        const chapImageListRes = response.map((res) => {
          return res.secure_url;
        });
        const json = await dispatch(
          fetchThunk(API_PATHS.createChapImage, 'post', {
            chapId: selectedComicChap?.id,
            chapImageList: chapImageListRes,
          }),
        );
        if (json.success) {
          setIsCreatedSuccess(true);
          setCheckedImageList([]);
          toast.success('Create successfully', { containerId: 'A' });
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [chapImageList.length, dispatch, selectedComic, selectedComicChap],
  );

  const handleUpdateChapImage = useCallback(
    async (file: File, chapImage: IChapImageInfo) => {
      setIsLoading(true);
      setIsCreatedSuccess(false);
      let publicId = '';
      let folder = '';
      if (selectedComic && selectedComicChap) {
        publicId = getImageNameExcludeFormat(getShortImageName(chapImage.image));
        folder = `comics/${bookNameTransform(selectedComic.name)}/${bookNameTransform(selectedComicChap.chapName)}`;
      }
      const { timestamp, signature } = await dispatch(
        fetchThunk(`${API_PATHS.signCloudinary}?public_id=${publicId}&folder=${folder}`, 'get'),
      );
      const response = await fetch(API_PATHS.uploadImage, {
        method: 'POST',
        mode: 'cors',
        body: createFormData(file, signature, timestamp, publicId, folder),
      });
      const result = await response.json();
      if (result.secure_url) {
        chapImage.image = result.secure_url;
      }
      const json = await dispatch(fetchThunk(`${API_PATHS.updateChapImage}/${chapImage.id}`, 'put', chapImage));

      if (json.success) {
        setIsCreatedSuccess(true);
        toast.success('Update successfully', { containerId: 'A' });
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch, selectedComic, selectedComicChap],
  );

  const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEditImage: boolean,
    chapImage: IChapImageInfo | undefined,
  ) => {
    if (e.target.files && !isEditImage) {
      const fileList = Array.from(e.target.files);
      handleCreateChapImage(fileList);
    } else if (e.target.files && isEditImage && e.target.files.length > 0 && chapImage) {
      handleUpdateChapImage(e.target.files[0], chapImage);
    }
  };

  const deleteChapImage = useCallback(
    async (deleteChapImageId: string) => {
      setIsLoading(true);
      const json = await dispatch(fetchThunk(`${API_PATHS.deleteChapImage}/${deleteChapImageId}`, 'delete'));
      if (json.success) {
        toast.success('Delete successfully', { containerId: 'A' });
        setIsDeleteDone(true);
        return;
      }
      setIsLoading(false);
      toast.error(json.error, { containerId: 'A' });
    },
    [dispatch],
  );

  useEffect(() => {
    if (chapImageList.length === 0 || isCreatedSuccess || isDeleteDone) getAllChapImages();
  }, [getAllChapImages, isCreatedSuccess, isDeleteDone]);
  return (
    <div>
      {isLoading && <Loader />}
      <Typography ml={4} variant="h4">{`${selectedComic?.name} - ${selectedComicChap?.chapName}`}</Typography>
      <Box textAlign="right">
        <Button
          onClick={() => {
            uploadInputRef.current?.click();
          }}
          sx={{ bgcolor: '#236FBC' }}
          startIcon={<CloudUploadIcon />}
          variant="contained"
        >
          Upload
        </Button>
        <input
          ref={uploadInputRef}
          type="file"
          multiple
          hidden
          onChange={(e) => {
            handleUploadImage(e, false, undefined);
          }}
        />
      </Box>
      <div className={classes.container}>
        {checkedImageList.length > 0 && (
          <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <CollectionsIcon sx={{ fontSize: '130px' }} />
            <Typography mt={2} sx={{ fontSize: '35px' }}>{`This chap hasn't had image yet`}</Typography>
          </Box>
        )}
        <Box display="flex" gap={3} flexWrap="wrap">
          {sortObj(chapImageList, 'image', true).map((chapImage: IChapImageInfo, index) => {
            return (
              <ComicChapImageCard
                handleDeleteChapImage={deleteChapImage}
                handleUploadImage={handleUploadImage}
                index={index}
                chapImage={chapImage}
                key={index}
              />
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default ComicChapImageList;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  imageWrapper: {
    width: '235px',
    height: '158px',
    backgroundColor: 'white',
  },
  imageCrop: {
    width: '235px',
    height: '158px',
  },
  imageName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  customTooltip: {
    backgroundColor: '#687076',
  },
  actionIconButton: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    backgroundColor: '#687076',
    color: '#FFF',
    top: 5,
    right: 5,
    '&:hover': {
      backgroundColor: '#687076',
      color: '#FFF',
    },
  },
  menu: {
    borderRadius: '0px',
  },
}));
