import React, { FC, useCallback, useState, useEffect } from 'react';
import ComicLayout from '../../layout/ComicLayout';
import ComicList from './ComicList';
import ComicBanner from './ComicSlider/ComicBanner';

interface Props {}

const HomePage: FC<Props> = () => {
  const [comicList, setcomicList] = useState<any[]>();
  const getComics = useCallback(async () => {
    const response = await fetch('/books.json');
    const comics = await response.json();
    setcomicList(comics);
  }, []);
  useEffect(() => {
    getComics();
  }, [getComics]);

  return (
    <ComicLayout>
      <ComicBanner comicList={comicList} />
      <ComicList comicList={comicList} />
    </ComicLayout>
  );
};

export default HomePage;
