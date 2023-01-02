import React, { FC, useState, useMemo, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography, Chip, Button, Divider } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { generateReadComicLink, shortenString } from '../../../../utils/generalHelpers';
import { IComicInfo } from '../../../../models/comic';
import { IGenreInfo } from '../../../../models/genre';
import { IAuthorInfo } from '../../../../models/author';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  comic: IComicInfo;
  isFavorited: boolean;
  handleCreateFavorite(): void;
  handleDeleteFavorite(): void;
}

const ComicInfo: FC<Props> = ({ comic, isFavorited, handleCreateFavorite, handleDeleteFavorite }) => {
  const [isShowMore, setIsShowMore] = useState(true);
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const chapTotal = useMemo(() => {
    return comic.Chaps?.length;
  }, [comic]);
  return (
    <div className={classes.comicInfoWrapper}>
      <img src={comic.image} alt={comic.name} className={classes.imageCard} />
      <div style={{ flex: 1 }}>
        <Typography fontSize="28px" textTransform="uppercase" mb={1}>
          {comic.name}
        </Typography>
        <Box display="flex" alignItems="center" my={2}>
          <Typography sx={{ marginRight: '10px' }}>Tác giả:</Typography>
          {comic.Authors?.map((author: IAuthorInfo) => (
            <Chip
              sx={{
                bgcolor: '#ff8a80',
                '&:hover': {
                  backgroundColor: '#ef9a9a',
                },
                marginLeft: '10px',
              }}
              label={author.name}
              onClick={() => navigate(`/comic/author/${author.id}`)}
              key={author.id}
            />
          ))}
        </Box>
        <Box display="flex" flexWrap="wrap" lineHeight="50px" alignItems="center">
          <Typography sx={{ marginRight: '5px' }}>Thể loại</Typography>
          <LocalOfferIcon />
          {':'}
          {comic.Genres?.map((genre: IGenreInfo) => (
            <Chip
              sx={{
                bgcolor: '#ff8a80',
                '&:hover': {
                  backgroundColor: '#ef9a9a',
                },
                marginLeft: '10px',
              }}
              label={genre.name}
              onClick={() => navigate(`/genres/${genre.id}`)}
              key={genre.id}
            />
          ))}
        </Box>
        <Box display="flex" my={2} gap={2}>
          <Box display="flex">
            <VisibilityIcon />
            <Typography sx={{ ml: '10px', color: '#ea6016' }}>{comic.viewCount}</Typography>
            <Typography ml={1}>Lượt Xem</Typography>
          </Box>
          <Divider sx={{ borderColor: '#757575' }} orientation="vertical" flexItem />
          <Box display="flex">
            <FavoriteIcon />
            <Typography sx={{ ml: '10px', color: '#ea6016' }}>{comic.voteCount}</Typography>
            <Typography ml={1}>Lượt thích</Typography>
          </Box>
          <Divider sx={{ borderColor: '#757575' }} orientation="vertical" flexItem />
          <Box display="flex">
            <ListAltIcon />
            <Typography sx={{ ml: '10px', color: '#ea6016' }}>{chapTotal}</Typography>
            <Typography ml={1}>Chương</Typography>
          </Box>
        </Box>
        <Box display="inline-flex">
          <Typography mr={1}>Nội dung</Typography>
          <MenuBookIcon />
          &nbsp;
          {':'}
        </Box>
        {comic.description.length < 250 ? (
          <span style={{ marginLeft: '5px' }}>{comic.description}</span>
        ) : isShowMore ? (
          <>
            <span style={{ marginLeft: '5px' }}>{shortenString(comic.description, comic.description.length / 2)}</span>
            <Typography
              mt={1}
              onClick={() => setIsShowMore(!isShowMore)}
              color="primary.main"
              sx={{ cursor: 'pointer' }}
            >
              Xem thêm
            </Typography>
          </>
        ) : (
          <>
            <span style={{ marginLeft: '5px' }}>{comic.description}</span>
            <Typography
              mt={1}
              onClick={() => setIsShowMore(!isShowMore)}
              color="primary.main"
              sx={{ cursor: 'pointer' }}
            >
              Thu gọn
            </Typography>
          </>
        )}
        <Box display="flex" mt={5} width="50%">
          <Button
            onClick={() => {
              if (comic && comic.Chaps && comic.Chaps.length > 0) {
                navigate(
                  generateReadComicLink(
                    comic.name,
                    comic.Chaps[comic.Chaps.length - 1].chapName,
                    comic.Chaps[comic.Chaps.length - 1].id!,
                  ),
                );
              } else {
                toast.error('Truyện chưa có chap nào , hệ thống sẽ cập nhật ngay khi có chap', { containerId: 'B' });
              }
            }}
            sx={{ flex: 1, fontSize: '18px', borderRadius: '8px' }}
            variant="contained"
          >
            Đọc truyện
          </Button>
          <Button
            sx={{
              ml: 2,
              flex: 1,
              bgcolor: !isFavorited ? '#ff9d11' : '#d2d3d9',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: !isFavorited ? '#ff9d11' : '#d2d3d9',
              },
              gap: 1,
            }}
            onClick={isFavorited ? handleDeleteFavorite : handleCreateFavorite}
            variant="contained"
          >
            {!isFavorited ? (
              <>
                <FavoriteBorderIcon />
                <Typography fontSize="18px">Yêu thích</Typography>
              </>
            ) : (
              <Typography fontSize="18px">Đã yêu thích</Typography>
            )}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ComicInfo;

const useStyles = makeStyles((theme) => ({
  comicInfoWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  imageCard: {
    height: '320px',
    width: '240px',
    objectFit: 'cover',
    marginRight: theme.spacing(3),
    flexShrink: 0,
  },
}));
