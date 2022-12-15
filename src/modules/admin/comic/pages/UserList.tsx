import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CellProps, Column } from 'react-table';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Dialog from '../../../../components/Dialog';
import FMTable from '../../../../components/FMTable';
import Loader from '../../../../components/Loader';
import { API_PATHS } from '../../../../configs/api';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../comic/common/redux/thunk';
import { setSelectedUserInfo, setUserListInfo } from '../redux/userAdminReducer';

interface Props {}

const UserList: FC<Props> = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDone, setIsDeleteDone] = useState(false);
  const userList = useSelector((state: AppState) => state.userAdmin.userList);
  const selectedUser = useSelector((state: AppState) => state.userAdmin.selectedUser);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [deletedUserId, setDeletedUserId] = useState('');
  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };

  const handleSelectUser = (cell: React.PropsWithChildren<CellProps<any, any>>) => {
    navigate(`/admin/pages/comics/user-detail/${cell.row.values.id}`);
  };

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.allUsers, 'get'));
    dispatch(setUserListInfo([...json.data]));
    setIsLoading(false);
    setIsDeleteDone(false);
  }, [dispatch]);

  const deleteUser = useCallback(async () => {
    setIsLoading(true);
    const json = await dispatch(fetchThunk(`${API_PATHS.deleteUser}/${deletedUserId}`, 'delete'));
    if (json.success) {
      setIsLoading(false);
      toast.success('Delete successfully', { containerId: 'A' });
      setIsDeleteDone(true);
      dispatch(setUserListInfo(userList.filter((user) => user.id !== deletedUserId)));
      if (selectedUser?.id === deletedUserId) {
        dispatch(setSelectedUserInfo(null));
      }
      return;
    }
    setIsLoading(false);
    toast.error(json.error, { containerId: 'A' });
  }, [deletedUserId, dispatch]);

  const columns: Column<any>[] = useMemo(() => {
    return [
      { Header: '#', accessor: (_row: any, i: number) => i + 1 },
      { Header: 'User ID', accessor: 'id' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'Username', accessor: 'username' },
      { Header: 'Role', accessor: 'Role.name' },
      {
        Header: 'Actions',
        Cell: (cell) => (
          <Box>
            <IconButton
              aria-label="edit"
              onClick={() => {
                handleSelectUser(cell);
              }}
            >
              <EditIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => {
                setDialogIsOpen(true);
                setDeletedUserId(cell.row.values.id);
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
    getAllUsers();
  }, [getAllUsers]);
  return (
    <div>
      {isLoading && <Loader />}
      <FMTable isDeleteDone={isDeleteDone} columns={columns} data={userList} />
      <Dialog
        isOpen={dialogIsOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this user ?"
        handleClose={handleCloseDialog}
        handleAccept={() => {
          deleteUser();
        }}
      />
    </div>
  );
};

export default UserList;
