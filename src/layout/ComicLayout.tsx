import React, { FC } from 'react';
import { Stack } from '@mui/material';
import Navbar from './Comic/Navbar';
interface Props {
  background?: string;
  children: React.ReactNode;
  isReadScreen: boolean;
}

const ComicLayout: FC<Props> = (props: Props) => {
  const { children, background } = props;
  return (
    <Stack sx={{ bgcolor: background || 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default ComicLayout;
