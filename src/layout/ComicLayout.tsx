import React, { FC } from 'react';
import { Stack } from '@mui/material';
import Navbar from './Comic/Navbar';
interface Props {
  children: React.ReactNode;
}

const ComicLayout: FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <Stack sx={{ bgcolor: 'background.paper', minHeight: '100vh' }}>
      <Navbar />
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default ComicLayout;
