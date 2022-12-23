import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducer';

interface Props {
  requiredAdminRole?: boolean;
  children: any;
}

const ProtectedRoute = (props: Props) => {
  const { requiredAdminRole, children } = props;
  const currentUser = useSelector((state: AppState) => state.profile.user);
  if (currentUser) {
    if (requiredAdminRole && currentUser.Role?.name === 'admin') {
      return children;
    } else if (requiredAdminRole && currentUser.Role?.name === 'member') {
      return <Navigate to="/login" />;
    } else return children;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
