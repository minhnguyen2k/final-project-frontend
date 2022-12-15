import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CellProps, Column } from 'react-table';
import { AppState } from '../../../../redux/reducer';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { setChapListInfo, setComicListInfo, setSelectedComicChapInfo } from '../redux/comicAdminReducer';
import FMTable from '../../../../components/FMTable';
import { useNavigate } from 'react-router-dom';
import Dialog from '../../../../components/Dialog';
import { sortObj } from '../../../../utils/generalHelpers';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';

interface Props {}

const ComicChapList: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const chapList = useSelector((state: AppState) => state.comicAdmin.comicChapList);
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const selectedChap = useSelector((state: AppState) => state.comicAdmin.selectedComicChap);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [deletedChapId, setDeletedChapId] = useState('');

  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };
  const handleSelectComic = (cell: React.PropsWithChildren<CellProps<any, any>>) => {
    navigate(`/admin/pages/comics/comic-chap-detail/${cell.row.values.id}`);
  };
  const getAllChaps = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.allChaps}?book_id=${selectedComic?.id}`, 'get'));
    dispatch(setChapListInfo([...sortObj(json.data, 'chapName', true)]));
    setIsLoading(false);
    setIsDeleteDone(false);
  }, [dispatch]);

  const deleteChap = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.deleteChap}/${deletedChapId}`, 'delete'));
    if (json.success) {
      setIsLoading(false);
      toast.success('Delete successfully', { containerId: 'A' });
      setIsDeleteDone(true);
      dispatch(setChapListInfo(chapList.filter((chap) => chap.id !== deletedChapId)));
      if (selectedChap?.id === deletedChapId) {
        dispatch(setSelectedComicChapInfo(null));
      }

      navigate('/admin/pages/comics/manage-comic-chap');
      return;
    }
    setIsLoading(false);
    toast.error(json.error, { containerId: 'A' });
  }, [deletedChapId, dispatch]);

  const columns: Column<any>[] = useMemo(() => {
    return [
      { Header: '#', accessor: (_row: any, i: number) => i + 1 },
      { Header: 'Chap ID', accessor: 'id' },
      { Header: 'Chap Name', accessor: 'chapName' },
      {
        Header: 'Actions',
        Cell: (cell) => (
          <Box>
            <IconButton
              aria-label="edit"
              onClick={() => {
                handleSelectComic(cell);
              }}
            >
              <EditIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => {
                setDialogIsOpen(true);
                setDeletedChapId(cell.row.values.id);
              }}
            >
              <DeleteIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    getAllChaps();
  }, []);
  return (
    <div>
      {isLoading && <Loader />}
      <FMTable
        isDeleteDone={isDeleteDone}
        columns={columns}
        data={chapList}
        createPath="/admin/pages/comics/new-comic-chap"
      />

      <Dialog
        isOpen={dialogIsOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this chap ? This will also delete all chap's images"
        handleClose={handleCloseDialog}
        handleAccept={() => {
          deleteChap();
        }}
      />
    </div>
  );
};

export default ComicChapList;
