import React, { FC, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TabPanel from '../../common/Panel/TabPanel';
import ChapterList from './ChapterList';
import Comment from '../../../comment';
import { IChapInfo } from '../../../../models/chap';

interface Props {
  chapList: IChapInfo[];
  bookName: string;
  chapterList?: IChapInfo[];
}

const ComicInfoNavigation: FC<Props> = ({ chapList, bookName, chapterList }) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const a11yProps = (index: number) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  };
  return (
    <div className={classes.comicInfoNavigationWrapper}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Chương" {...a11yProps(0)} />
          <Tab label="Bình luận" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={value}>
        <ChapterList bookName={bookName} chapList={chapList} />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Comment />
      </TabPanel>
    </div>
  );
};

export default ComicInfoNavigation;

const useStyles = makeStyles((theme) => ({
  comicInfoNavigationWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    width: '75%',
  },
  imageCard: {
    height: '320px',
    width: '240px',
    objectFit: 'cover',
    marginRight: theme.spacing(3),
  },
}));
