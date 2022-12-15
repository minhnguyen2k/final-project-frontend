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
import { setComicListInfo, setSelectedComicChapInfo, setSelectedComicInfo } from '../redux/comicAdminReducer';
import FMTable from '../../../../components/FMTable';
import { useNavigate } from 'react-router-dom';
import Dialog from '../../../../components/Dialog';
import { sortObj } from '../../../../utils/generalHelpers';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';

interface Props {}

const ComicList: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const comicList = useSelector((state: AppState) => state.comicAdmin.comicList);
  const selectedComic = useSelector((state: AppState) => state.comicAdmin.selectedComic);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [deletedComicId, setDeletedComicId] = useState('');
  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };

  const handleSelectComic = (cell: React.PropsWithChildren<CellProps<any, any>>) => {
    navigate(`/admin/pages/comics/comic-detail/${cell.row.values.id}`);
    dispatch(setSelectedComicChapInfo(null));
  };

  const getAllComic = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.allBooksWithNotPagination, 'get'));
    dispatch(setComicListInfo([...sortObj(json.data, 'name', true)]));
    setIsLoading(false);
    setIsDeleteDone(false);
  }, [dispatch, isDeleteDone]);

  const deleteComic = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.deleteBook}/${deletedComicId}`, 'delete'));
    if (json.success) {
      toast.success('Delete successfully', { containerId: 'A' });
      if (selectedComic?.id === deletedComicId) {
        dispatch(setSelectedComicInfo(null));
      }
      setIsDeleteDone(true);
      return;
    }
    setIsLoading(false);
    toast.error(json.error, { containerId: 'A' });
  }, [deletedComicId, dispatch]);

  const columns: Column<any>[] = useMemo(() => {
    return [
      { Header: '#', accessor: (_row: any, i: number) => i + 1 },
      { Header: 'Comic ID', accessor: 'id' },
      { Header: 'Comic Name', accessor: 'name' },
      { Header: 'Comic View', accessor: 'viewCount' },
      { Header: 'Comic Vote', accessor: 'voteCount' },
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
                setDeletedComicId(cell.row.values.id);
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
    getAllComic();
  }, [getAllComic]);
  return (
    <div>
      {isLoading && <Loader />}
      <FMTable
        isDeleteDone={isDeleteDone}
        columns={columns}
        data={comicList}
        createPath="/admin/pages/comics/new-comic"
      />
      <Dialog
        isOpen={dialogIsOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this comic ? This will also delete all relevant information of comic"
        handleClose={handleCloseDialog}
        handleAccept={() => {
          deleteComic();
        }}
      />
    </div>
  );
};

export default ComicList;
