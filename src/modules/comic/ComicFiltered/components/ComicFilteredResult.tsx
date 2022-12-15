import { Box } from '@mui/material';
import React, { FC } from 'react';
import { IComicInfo } from '../../../../models/comic';
import ComicCard from '../../ComicList/ComicCard';

interface Props {
  comicListFiltered: IComicInfo[];
}

const ComicFilteredResult: FC<Props> = ({ comicListFiltered }) => {
  return (
    <Box display="flex" pl={5} flexWrap="wrap" gap={4}>
      {comicListFiltered.map((comic) => {
        return (
          <Box key={comic.id}>
            <ComicCard comic={comic} width="150px" height="200px" sortType="popular" />
          </Box>
        );
      })}
    </Box>
  );
};

export default ComicFilteredResult;
